import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AnalyticsRepository } from "../repository";
import { AnalyticsService } from "../services/analytics.service";
import { parcels } from "./mock";

describe("AnalyticsService", () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        {
          provide: getRepositoryToken(AnalyticsRepository),
          useValue: { aggregateEntity: jest.fn(() => ({ toArray: async () => parcels })) }
        }
      ]
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return transformed parcels data", async () => {
    const data = await service.findParcelsData({ parcels: ["PP-O9972822-2693"] });
    expect(data).toBeDefined();
  });
});
