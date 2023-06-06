import {
  DefaultTrackingRepository,
  OrderTrackingRepository,
  ParcelTrackingRepository,
  RequestTrackingRepository,
  RunsheetTrackingRepository,
  TaskTrackingRepository,
  UserTrackingRepository
} from "@history/repositories";
import { DefaultHistoryService } from "@history/services/default-history.service";
import { ParcelHistoryService } from "@history/services/parcel-history.service";
import { RunsheetHistoryService } from "@history/services/runsheet-history.service";
import { TaskHistoryService } from "@history/services/task-history.service";
import { UserHistoryService } from "@history/services/user-history.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Kafka, logLevel } from "kafkajs";
import { ObjectID } from "mongodb";
import { KAFKA_BROKER_1, NODE_ENV } from "src/environments";
import { ConsumerService } from "src/modules/kafka/consumer.service";
import { HistoryService } from "../services/history.service";
import { OrderHistoryService } from "./../services/order-history.service";
import { RequestHistoryService } from "./../services/request-history.service";
import {
  activities,
  activitiesInput,
  activityInput,
  findAcitivitiesByUidInput,
  findAcitivitiesInput
} from "./activities.stub";

const historyRepository: { [k in keyof ParcelTrackingRepository]?: any } = {
  create: jest.fn((payload) => {
    if (Array.isArray(payload)) {
      return payload.map((activity) => ({ ...activity, _id: new ObjectID() }));
    }
    return { ...payload, _id: new ObjectID() };
  }),
  insertOne: jest.fn((activity) => {
    return Promise.resolve({
      ops: [activity]
    });
  }),
  insertMany: jest.fn((activities) => {
    return Promise.resolve({
      ops: [activities]
    });
  }),
  find: jest.fn(({ where }) => {
    if (where.sourceUid)
      return Promise.resolve(activities.filter((activity) => activity.sourceUid === where.sourceUid));
    return Promise.resolve(activities.filter((activity) => where.sourceUids.include(activity.sourceUid)));
  })
};
describe("HistoryService", () => {
  let service: HistoryService;
  let orderService: OrderHistoryService;
  let parcelService: ParcelHistoryService;
  let requestService: RequestHistoryService;
  let runsheetService: RunsheetHistoryService;
  let taskService: TaskHistoryService;
  let userService: UserHistoryService;
  let defaultService: DefaultHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        OrderHistoryService,
        ParcelHistoryService,
        RequestHistoryService,
        RunsheetHistoryService,
        TaskHistoryService,
        DefaultHistoryService,
        UserHistoryService,
        {
          provide: ConsumerService,
          useFactory: () =>
            new Kafka({
              brokers: [KAFKA_BROKER_1],
              logLevel: NODE_ENV === "development" ? logLevel.INFO : logLevel.NOTHING
            })
        },
        {
          provide: getRepositoryToken(OrderTrackingRepository),
          useValue: historyRepository
        },
        {
          provide: getRepositoryToken(ParcelTrackingRepository),
          useValue: historyRepository
        },
        {
          provide: getRepositoryToken(RunsheetTrackingRepository),
          useValue: historyRepository
        },
        {
          provide: getRepositoryToken(RequestTrackingRepository),
          useValue: historyRepository
        },
        {
          provide: getRepositoryToken(UserTrackingRepository),
          useValue: historyRepository
        },
        {
          provide: getRepositoryToken(TaskTrackingRepository),
          useValue: historyRepository
        },
        {
          provide: getRepositoryToken(DefaultTrackingRepository),
          useValue: historyRepository
        }
      ]
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    orderService = module.get<OrderHistoryService>(OrderHistoryService);
    parcelService = module.get<ParcelHistoryService>(ParcelHistoryService);
    requestService = module.get<RequestHistoryService>(RequestHistoryService);
    runsheetService = module.get<RunsheetHistoryService>(RunsheetHistoryService);
    taskService = module.get<TaskHistoryService>(TaskHistoryService);
    userService = module.get<UserHistoryService>(UserHistoryService);
    defaultService = module.get<DefaultHistoryService>(DefaultHistoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(orderService).toBeDefined();
    expect(parcelService).toBeDefined();
    expect(requestService).toBeDefined();
    expect(runsheetService).toBeDefined();
    expect(taskService).toBeDefined();
    expect(userService).toBeDefined();
    expect(defaultService).toBeDefined();
  });

  it("should create an activity", async () => {
    const activities = await Promise.all(activitiesInput.map(async (activity) => await service.create(activityInput)));
    expect(activities.length).toBe(7);
    expect(activities[0]._id).toBeInstanceOf(ObjectID);
  });

  it("should create activies for each context", async () => {
    const activities = await service.createMany({ activities: activitiesInput });
    expect(activities.length).toBe(7);
  });

  it("should find activities by source uid", async () => {
    const activities = await Promise.all(
      findAcitivitiesInput.map((input) => {
        return service.findAllActivies(input);
      })
    );
    expect(activities.length).toBe(7);
  });

  it("should find activities by source uids", async () => {
    const activities = await Promise.all(
      findAcitivitiesByUidInput.map((input) => {
        return service.findAllByUids(input);
      })
    );
    expect(activities.length).toBe(7);
  });
});
