import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as Email from "node-mailjet";
import { paginate } from "src/common/pagination";
import { AbstractService } from "src/common/services/abstract.service";
import { EMessage, MessageStatus } from "src/common/typeDefs";
import { NODE_ENV } from "src/environments";
import { ConsumerService } from "src/modules/kafka/consumer.service";
import { Topics } from "src/modules/kafka/utils";
import { generateUid } from "src/utils/generate-code";
import { template } from "../constants";
import { FetchEmailQuery } from "../dto/fetch-email.input";
import { SendEmailInput } from "../dto/send-email.input";
import { EmailRepository } from "../email.repository";
import { Email as EmailSchema} from "../schema/email.schema";

@Injectable()
export class EmailService extends AbstractService<EmailSchema> implements OnModuleInit {
  mailjetConfig: Email.Client;
  constructor(
    @InjectRepository(EmailRepository) repo: EmailRepository,
    @Inject("MAILJET") protected mailJetClient,
    private readonly kafkaConsumer: ConsumerService
  ) {
    super(repo);
  }

  onModuleInit() {
    this.consumeKafkaMessage();
  }

  findAll({ limit, date, page }: FetchEmailQuery) {
    const dateInf = date && new Date(date);
    const dateSup = date && new Date(date);
    dateSup && dateSup.setDate(dateInf.getDate() + 1);
    const query = {
      createdAt: { $gte: dateInf?.toISOString(), $lte: dateSup?.toISOString() }
    };
    return paginate({
      repo: this.repo,
      limit: limit,
      page: page,
      query: { ...(date && query), isDeleted: false }
    });
  }

  public async sendEmail(input: SendEmailInput) {
    const uid = await this.generateCode(EMessage.Mail);
    const emailToSave = {
      uid: uid,
      ...input
    };
    const emailSaved = await this.create(emailToSave);
    if (!emailSaved) throw new HttpException("Creation e-mail failed ", HttpStatus.BAD_REQUEST);
    const response = await this.sendMailJetEmail(emailSaved);

    if (response.status !== 200) {
      await this.update(emailSaved._id.toString(), {
        status: MessageStatus.Failed
      });
      throw new HttpException("Sending e-mail failed", HttpStatus.BAD_REQUEST);
    }

    return this.update(emailSaved._id.toString(), {
      status: MessageStatus.Done
    });
  }

  async resendEmail(uid: string) {
    const email = await this.repo.findOne({
      where: {
        uid,
        status: { $in: [MessageStatus.Pending, MessageStatus.Failed] }
      }
    });

    if (!email)
      throw new NotFoundException({
        message: "email not found or not have right status"
      });

    const response = await this.sendMailJetEmail(email);
    if (response.status !== 200) {
      await this.update(email._id.toString(), { status: MessageStatus.Failed });
      throw new HttpException("Sending e-mail failed", HttpStatus.BAD_REQUEST);
    }

    return this.update(email._id.toString(), { status: MessageStatus.Done });
  }

  private async sendMailJetEmail(email: EmailSchema) {
    const res = (await this.mailJetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: email.fromEmail,
            Name: email.fromName
          },
          To: [
            {
              Email: email.toEmail,
              Name: email.toName
            }
          ],
          TemplateID: email?.templateId ?? (email.withRedirection ? template[1].id : template[2].id),
          TemplateLanguage: true,
          variables: email?.variables && {
            ...email?.variables,
            button_link: email?.variables.buttonLink || "",
            button_name: email.variables.buttonName || ""
          },
          subject: email.subject
        }
      ]
    })) as unknown as { response: any };

    return res.response;
  }

  private async sendMailsNotification(mails: SendEmailInput[]) {
    const lastUid = await this.generateCode(EMessage.Mail);
    const messages = await Promise.all(
      mails.map(async (mail, index) => {
        const uid = generateUid(EMessage.Mail, lastUid, index);
        return this.create({ ...mail, uid });
      })
    );
    await Promise.all(
      messages.map(async (mail) => {
        const response = await this.sendMailJetEmail.call(this, mail);
        const status = response.status === 200 ? MessageStatus.Done : MessageStatus.Failed;
        this.update(mail._id.toString(), { status });
      })
    );
  }
  public async eachMessageHandler({ message }: Record<string, any>) {
    const messages = JSON.parse(message?.value?.toString()) as SendEmailInput[];
    this.sendMailsNotification(messages);
  }

  private async consumeKafkaMessage() {
    this.kafkaConsumer.consume(
      { topics: [`${Topics.Messaging}-${NODE_ENV}`] },
      { eachMessage: this.eachMessageHandler.bind(this) },
      `messaging-${NODE_ENV}`
    );
  }
}
