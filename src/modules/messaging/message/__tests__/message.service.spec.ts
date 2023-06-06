import { Test, TestingModule } from "@nestjs/testing";
import { EMessage } from "src/common/typeDefs";
import { generateUid } from "src/utils/generate-code";
import { MessageRepository } from "../message.repository";
import { MessageService } from "../services/message.service";

jest.mock("src/modules/messaging/message/utils/send-message.ts");

describe("MessageService", () => {
  const message = {
    _id: "628385ece7e8a6fb34ce5f45",
    to: "+221777902880",
    sender: "Paps",
    text: "Bonjour MGG ce ci est un test",
    uid: "PP-SMS-000002"
  };
  let service: MessageService;
  const messageRepository = {
    create: jest.fn((payload) => payload),
    save: jest.fn((payload) => Promise.resolve({ _id: "627e9e25f33335c79527f220", ...payload })),
    findOneAndUpdate: jest.fn((payload) =>
      Promise.resolve({
        ok: 1,
        value: payload
      })
    ),
    findOne: jest.fn((payload) => Promise.resolve(message)),
    find: jest.fn((payload) => Promise.resolve([message])),
    count: jest.fn(() => Promise.resolve([message].length))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: MessageRepository,
          useValue: messageRepository
        }
      ]
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createMessage", () => {
    it("Should send and create Message", async () => {
      await expect(service.sendMessage(message)).rejects.toThrow();
      const data = await service.sendMessage(message);
      expect(data).toBeDefined();
      expect(data.uid).toBe("PP-SMS-000003");
    });
  });

  describe("findAll Messages", () => {
    it("Should find all findAll Messages ", async () => {
      const data = await service.findAll({ limit: 1, date: "2022-05-13" });
      expect(data).toBeDefined();
      expect(data.countTotal).toBe(1);
    });
  });

  describe("resend message", () => {
    it("should resend message", async () => {
      const uid = "PP-SMS-000002";
      jest.spyOn(messageRepository, "findOne").mockResolvedValueOnce(undefined);
      await expect(service.resendMessage(uid)).rejects.toThrow();
      const message = await service.resendMessage(uid);
      expect(message.uid).toBe("PP-SMS-000002");
    });
  });

  it("should generate next uid", async () => {
    const uid = generateUid(EMessage.Mail, "PP-ML-000001", 2);
    expect(uid).toBe("PP-ML-000003");
  });
});
