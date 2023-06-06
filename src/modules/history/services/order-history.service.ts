import { InjectRepository } from "@nestjs/typeorm";
import { OrderTrackingRepository } from "../repositories";
import { OrderActivities } from "../schemas";
import { BaseHistoryService } from "./base-history.service";

export class OrderHistoryService extends BaseHistoryService<OrderActivities> {
  constructor(@InjectRepository(OrderTrackingRepository) repository: OrderTrackingRepository) {
    super(repository);
  }
}
