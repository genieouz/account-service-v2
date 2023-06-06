import { HttpException, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "src/common/pagination";
import { AbstractService } from "src/common/services/abstract.service";
import { EMessage, MessageStatus } from "src/common/typeDefs";
import { NODE_ENV } from "src/environments";
import { ConsumerService } from "src/modules/kafka/consumer.service";
import { Topics } from "src/modules/kafka/utils";
import { ChangeMessageStatusInput } from "../dto/change-message-status.input";
import { SendMessageInput } from "../dto/create-message.input";
import { FetchMessageQuery } from "../dto/fetch-message.input";
import { MessageRepository } from "../message.repository";
import { Message } from "../schema/message.schema";
import { sendMessageHttp } from "../utils/send-message";

@Injectable()
export class MessageService extends AbstractService<Message> implements OnModuleInit {
  constructor(@InjectRepository(MessageRepository) repo: MessageRepository, private kafkaCosumer: ConsumerService) {
    super(repo);
  }
  async onModuleInit() {
    await this.cosumekakfaMesssages();
  }
  private async createMessage(input: SendMessageInput) {
    const uid = await this.generateCode(EMessage.Sms);
    const message = new Message({
      ...input,
      uid,
      status: MessageStatus.Pending
    });
    return this.create(message);
  }

  findAll({ limit, date, page }: FetchMessageQuery) {
    const dateInf = date && new Date(date);
    const dateSup = date && new Date(date);
    dateSup && dateSup.setDate(dateInf.getDate() + 1);
    const query = {
      createdAt: { $gte: dateInf?.toISOString(), $lte: dateSup?.toISOString() }
    };
    return paginate({
      repo: this.repo,
      limit: limit,
      query: { ...(dateSup && query), isDeleted: false },
      page: page
    });
  }

  private async changeMessageStatus(input: ChangeMessageStatusInput) {
    return this.update(input.id, { status: input.status });
  }

  async sendMessage(input: SendMessageInput) {
    const messageSaved = await this.createMessage(input);
    const response = await sendMessageHttp(input);
    const changeStatusData = {
      id: messageSaved._id.toString(),
      status: MessageStatus.Failed
    };

    if (response.status !== 200 || response.statusText !== "OK") {
      await this.changeMessageStatus(changeStatusData);
      throw new HttpException("Sending sms failed ", response.status);
    }
    changeStatusData.status = MessageStatus.Done;
    await this.changeMessageStatus(changeStatusData);
    return messageSaved;
  }

  public async resendMessage(uid: string) {
    const message = await this.repo.findOne(
      {
        where: {
          uid,
          status: { $in: [MessageStatus.Pending, MessageStatus.Failed] }
        },
        select: ["_id", "to", "text", "sender"]
      },
    );

    if (!message)
      throw new NotFoundException({
        message: "message not found or not have right status"
      });
    const { status, statusText } = await sendMessageHttp(message as SendMessageInput);
    if (status === 200 && statusText === "OK")
      await this.changeMessageStatus({
        id: message._id.toString(),
        status: MessageStatus.Done
      });
    return message;
  }

  handleEachMessage({ message }: Record<string, any>) {
    const smsMessage = JSON.parse(message?.value?.toString()) as SendMessageInput;
    this.sendMessage(smsMessage);
  }
  cosumekakfaMesssages() {
    this.kafkaCosumer.consume(
      { topics: [`${Topics.Sms}-${NODE_ENV}`] },
      { eachMessage: this.handleEachMessage.bind(this) },
      `sms-${NODE_ENV}`
    );
  }
}
