import { Test, TestingModule } from "@nestjs/testing";
import { MessageStatus } from "src/common/typeDefs";
import { ConsumerService } from "src/modules/kafka/consumer.service";
import { EmailRepository } from "../email.repository";
import { EmailService } from "../services/email.service";

describe("EmailService", () => {
  const emailmockInput = {
    toEmail: "paadama17@gmail.com",
    toName: "Mohamet",
    subject: "test",
    withRedirection: true,
    variables: {
      title: "Salut",
      firstname: "Mohamet",
      message: "Binjour tous le monde !"
    }
  };
  const emailmock = {
    _id: "62501eee62ee286573794340",
    uid: "PP-ML-000001",
    toEmail: "paadama17@gmail.com",
    toName: "Mohamet",
    subject: "test",
    withRedirection: true,
    variables: {
      title: "Salut",
      firstname: "Mohamet",
      message: "Binjour tous le monde !"
    },
    status: MessageStatus.Done
  };

  let service: EmailService;
  let emailRepository = {
    find: jest.fn((payload) => Promise.resolve([emailmock])),
    findOne: jest.fn((payload) => Promise.resolve({ ...emailmock, withRedirection: true })),
    create: jest.fn((input) => input),
    delete: jest.fn((payload) =>
      Promise.resolve({
        ...emailmock,
        isDeleted: true
      })
    ),
    save: jest.fn((input) =>
      Promise.resolve({
        ...input,
        uid: "PP-ML-000002",
        _id: "62501eee62ee286573794330"
      })
    ),
    count: jest.fn(() => Promise.resolve([emailmock].length)),
    findOneAndUpdate: jest.fn((id, payload) =>
      Promise.resolve({
        ok: 1,
        value: {
          ...emailmock,
          withRedirection: true
        }
      })
    )
  };
  class MailJetClientMock {
    static post(payload) {
      return this;
    }
    static async request(payload) {
      return {
        response: {
          status: 200
        }
      };
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: EmailRepository, useValue: emailRepository },
        { provide: "MAILJET", useValue: MailJetClientMock },
        { provide: ConsumerService, useValue: {} }
      ]
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll emails", () => {
    it("should findAll emails", async () => {
      const data = await service.findAll({ limit: 1, date: "2022-05-13" });
      expect(data).toBeDefined();
      expect(data.countTotal).toBe(1);
    });
  });
  describe("It should send Email", () => {
    it("It should send Email", async () => {
      jest.spyOn(service, "create").mockImplementationOnce((payload) => Promise.resolve(null));
      await expect(service.sendEmail(emailmockInput)).rejects.toThrow();

      jest
        .spyOn(MailJetClientMock, "request")
        .mockImplementationOnce((payload) => Promise.resolve({ response: { status: 403 } }));

      await expect(service.sendEmail(emailmockInput)).rejects.toThrow();

      const { withRedirection, status, variables } = await service.sendEmail(emailmockInput);
      expect(withRedirection).toBeTruthy();

      expect(variables).toBeTruthy();

      expect(status).toBe(MessageStatus.Done);
    });
  });
  describe("It should resend Email", () => {
    it("It should resend Email", async () => {
      const uid = "62501eee62ee286573794330";

      jest.spyOn(emailRepository, "findOne").mockImplementationOnce((payload) => Promise.resolve(null));

      await expect(service.resendEmail(uid)).rejects.toThrow();

      jest
        .spyOn(MailJetClientMock, "request")
        .mockImplementationOnce((payload) => Promise.resolve({ response: { status: 403 } }));

      await expect(service.resendEmail(uid)).rejects.toThrow();

      const data = await service.resendEmail(uid);
      expect(data.status).toBe(MessageStatus.Done);
    });

    it("should send mails for each message", async () => {
      const kafkaMessage = {
        message: {
          value: `[{"toName":"SALES","toEmail":"dev@paps-app.com","subject":"PAPS - National Transport","variables":{"title":"National Transport","dear":"Cher Sales","firstname":"SALES","message":"Votre requête PP-REQ-000038 pour un National Transport est en cours de traitement. Nous vous remercions de votre patience le temps que nous vous fournissions un devis. Une notification vous sera envoyée dès que votre devis sera disponible. Bien à vous, PAPS Team 🙂","templateId":3079092}}]`,
          key: "NOTIF_AFTER_REQUEST_CREATION"
        }
      };
      service.eachMessageHandler(kafkaMessage);
      expect(emailRepository.find).toHaveBeenCalled();
      expect(emailRepository.create).toHaveBeenCalled();
      expect(emailRepository.save).toHaveBeenCalled();
    });
  });
});
