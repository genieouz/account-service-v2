import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getMongoManager } from "typeorm";
import { KafkaModule } from "../kafka/kafka.module";
import {
  DefaultTrackingRepository,
  OrderTrackingRepository,
  ParcelTrackingRepository,
  RequestTrackingRepository,
  RunsheetTrackingRepository,
  TaskTrackingRepository,
  UserTrackingRepository
} from "./repositories";
import { HistoryResolver } from "./resolvers/history.resolver";
import { ActivityListResolver } from "./resolvers/reference.resolver";
import {
  DefaultActivities,
  OrderActivities,
  ParcelActivities,
  RequestActivities,
  RunsheetActivities,
  TaskActivities,
  UserActivities
} from "./schemas";
import { DefaultHistoryService } from "./services/default-history.service";
import { HistoryService } from "./services/history.service";
import { OrderHistoryService } from "./services/order-history.service";
import { ParcelHistoryService } from "./services/parcel-history.service";
import { RequestHistoryService } from "./services/request-history.service";
import { RunsheetHistoryService } from "./services/runsheet-history.service";
import { TaskHistoryService } from "./services/task-history.service";
import { UserHistoryService } from "./services/user-history.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderTrackingRepository,
      ParcelTrackingRepository,
      RequestTrackingRepository,
      RunsheetTrackingRepository,
      TaskTrackingRepository,
      DefaultTrackingRepository,
      UserTrackingRepository
    ]),
    KafkaModule
  ],
  providers: [
    HistoryResolver,
    ActivityListResolver,
    HistoryService,
    OrderHistoryService,
    ParcelHistoryService,
    RunsheetHistoryService,
    RequestHistoryService,
    TaskHistoryService,
    DefaultHistoryService,
    UserHistoryService
  ]
})
export class HistoryModule implements OnModuleInit {
  onModuleInit() {
    // const mongoManager = getMongoManager("default");
    // mongoManager.createCollectionIndex(OrderActivities, { "$**": "text" });
    // mongoManager.createCollectionIndex(ParcelActivities, { "$**": "text" });
    // mongoManager.createCollectionIndex(RunsheetActivities, { "$**": "text" });
    // mongoManager.createCollectionIndex(RequestActivities, { "$**": "text" });
    // mongoManager.createCollectionIndex(TaskActivities, { "$**": "text" });
    // mongoManager.createCollectionIndex(UserActivities, { "$**": "text" });
    // mongoManager.createCollectionIndex(DefaultActivities, { "$**": "text" });
  }
}
