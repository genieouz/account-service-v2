import { Injectable, OnModuleInit } from "@nestjs/common";
import { EachMessagePayload, KafkaMessage } from "kafkajs";
import { NODE_ENV } from "src/environments";
import { ConsumerService } from "src/modules/kafka/consumer.service";
import { Topics } from "src/modules/kafka/utils";
import { toObjectID } from "src/utils";
import {
  CreateActivitiesInput,
  CreateActivityInput,
  FindAllActivitiesByUidsInput,
  FindAllActivitiesInput
} from "../dto/create-activity.input";
import { ActivityContext, ActivitySource } from "../enums";
import { BaseHistory } from "../schemas/base-history.schema";
import { DefaultHistoryService } from "./default-history.service";
import { OrderHistoryService } from "./order-history.service";
import { ParcelHistoryService } from "./parcel-history.service";
import { RequestHistoryService } from "./request-history.service";
import { RunsheetHistoryService } from "./runsheet-history.service";
import { TaskHistoryService } from "./task-history.service";
import { UserHistoryService } from "./user-history.service";

type ActivitiesByContext = { [k in ActivityContext]?: Partial<BaseHistory>[] };
type ActivitiesAndContexts = { context: ActivityContext[]; activities: Partial<BaseHistory>[] };

@Injectable()
export class HistoryService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly orderTrackingService: OrderHistoryService,
    private readonly parcelTrackingService: ParcelHistoryService,
    private readonly runsheetTrackingService: RunsheetHistoryService,
    private readonly requestTrackingService: RequestHistoryService,
    private readonly taskTrackingService: TaskHistoryService,
    private readonly userTrackingService: UserHistoryService,
    private readonly defaultTrackingService: DefaultHistoryService
  ) {}

  onModuleInit() {
    this.consumeKafkaActivityTopic();
  }

  async create(input: CreateActivityInput) {
    // const handleCreate: {
    //   [k in ActivityContext]: (params: Partial<BaseHistory>) => Promise<BaseHistory>;
    // } = {
    //   Order: (params) => {
    //     return this.orderTrackingService.insertOne(params);
    //   },
    //   Parcel: (params) => {
    //     return this.parcelTrackingService.insertOne(params);
    //   },
    //   Runsheet: (params) => {
    //     return this.runsheetTrackingService.insertOne(params);
    //   },
    //   Request: (params) => {
    //     return this.requestTrackingService.insertOne(params);
    //   },
    //   Task: (params) => {
    //     return this.taskTrackingService.insertOne(params);
    //   },
    //   User: (params) => {
    //     return this.userTrackingService.insertOne(params);
    //   },
    //   Default: (params) => {
    //     return this.defaultTrackingService.insertOne(params);
    //   }
    // };
    // const activity = {
    //   ...input,
    //   date: new Date(input.date),
    //   triggerUserId: toObjectID(input.triggerUserId)
    // };
    // return handleCreate[input.context](activity);
    //TODO: create
    return
  }

  async createMany({ activities: input }: CreateActivitiesInput) {
    const { activities, context } = input.reduce<ActivitiesAndContexts>(
      (prev, next) => {
        const { context, date, triggerUserId } = next;
        prev.context = [...prev.context, context];
        prev.activities = [
          ...prev.activities,
          { ...next, date: new Date(date), triggerUserId: toObjectID(triggerUserId) }
        ];
        return prev;
      },
      { context: [], activities: [] } as ActivitiesAndContexts
    );

    let activitiesByContext: ActivitiesByContext = {};
    const contextSet = new Set([...context]);
    if (contextSet.size === 1) activitiesByContext[context[0]] = activities;
    else activitiesByContext = this.groupActivitiesByContext(activities);

    // const handleCreateMany: {
    //   [k in ActivityContext]: (params: Partial<BaseHistory>[]) => Promise<BaseHistory[]>;
    // } = {
    //   Order: (params) => {
    //     return this.orderTrackingService.insertManyActivities(params);
    //   },
    //   Parcel: (params) => {
    //     return this.parcelTrackingService.insertManyActivities(params);
    //   },
    //   Runsheet: (params) => {
    //     return this.runsheetTrackingService.insertManyActivities(params);
    //   },
    //   Request: (params) => {
    //     return this.requestTrackingService.insertManyActivities(params);
    //   },
    //   Task: (params) => {
    //     return this.taskTrackingService.insertManyActivities(params);
    //   },
    //   User: (params) => {
    //     return this.userTrackingService.insertManyActivities(params);
    //   },
    //   Default: (params) => {
    //     return this.defaultTrackingService.insertManyActivities(params);
    //   }
    // };

    // const allActivities = await Promise.all(
    //   Object.entries(activitiesByContext).map(async ([context, activities]) => {
    //     return await handleCreateMany[context as ActivitySource](activities);
    //   })
    // );
    // return allActivities.flat() as BaseHistory[];
    // TODO: create many
    return
  }

  async findAllActivies(input: FindAllActivitiesInput) {
    const { context } = input;

    const handleFindAll: {
      [k in ActivityContext]: (params: FindAllActivitiesInput) => Promise<BaseHistory[]>;
    } = {
      Order: (params) => {
        return this.orderTrackingService.findAll(params, { date: "DESC" });
      },
      Parcel: (params) => {
        return this.parcelTrackingService.findAll(params, { date: "DESC" });
      },
      Runsheet: (params) => {
        return this.runsheetTrackingService.findAll(params, { date: "DESC" });
      },
      Request: (params) => {
        return this.requestTrackingService.findAll(params, { date: "DESC" });
      },
      Task: (params) => {
        return this.taskTrackingService.findAll(params, { date: "DESC" });
      },
      User: (params) => {
        return this.userTrackingService.findAll(params, { date: "DESC" });
      },
      Default: (params) => {
        return this.defaultTrackingService.findAll(params, { date: "DESC" });
      }
    };
    return handleFindAll[context](input);
  }

  public async findAllByUids(params: FindAllActivitiesByUidsInput) {
    const { context } = params;
    const handleFindAll: {
      [k in ActivityContext]: (params: FindAllActivitiesByUidsInput) => Promise<BaseHistory[]>;
    } = {
      Order: (params) => {
        return this.orderTrackingService.findAllByUids(params, { date: "DESC" });
      },
      Parcel: (params) => {
        return this.parcelTrackingService.findAllByUids(params, { date: "DESC" });
      },
      Runsheet: (params) => {
        return this.runsheetTrackingService.findAllByUids(params, { date: "DESC" });
      },
      Request: (params) => {
        return this.requestTrackingService.findAllByUids(params, { date: "DESC" });
      },
      Task: (params) => {
        return this.taskTrackingService.findAllByUids(params, { date: "DESC" });
      },
      User: (params) => {
        return this.userTrackingService.findAllByUids(params, { date: "DESC" });
      },
      Default: (params) => {
        return this.defaultTrackingService.findAllByUids(params, { date: "DESC" });
      }
    };
    return handleFindAll[context](params);
  }

  private groupActivitiesByContext(activities: Partial<BaseHistory>[]) {
    const activitiesByContext = activities.reduce<ActivitiesByContext>((prev, next) => {
      if (prev[next.context]) prev[next.context] = [...prev[next.context], next];
      else prev[next.context] = [next];
      return prev;
    }, {} as ActivitiesByContext);
    return activitiesByContext;
  }

  /* istanbul ignore next */
  private handleMessage(messagees: KafkaMessage) {
    const key = messagees.key.toString();
    const value = JSON.parse(messagees.value.toString());
    if (key === "addActivity") this.create(value as CreateActivityInput);
    if (key === "addActivities") this.createMany({ activities: value as CreateActivityInput[] });
  }
  /* istanbul ignore next */
  private consumeKafkaActivityTopic() {
    this.consumerService.consume(
      { topics: [`${Topics.History}-${NODE_ENV}`] },
      {
        eachMessage: async (payload: EachMessagePayload) => {
          this.handleMessage.call(this, payload.message);
        }
      },
      `history-${NODE_ENV}`
    );
  }
}
