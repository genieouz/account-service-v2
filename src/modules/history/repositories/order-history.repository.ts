import { EntityRepository, MongoRepository } from "typeorm";
import { OrderActivities } from "../schemas/order-history.schema";

@EntityRepository(OrderActivities)
export class OrderTrackingRepository extends MongoRepository<OrderActivities> {}
