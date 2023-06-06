import { EntityRepository, MongoRepository } from "typeorm";
import { AnalyticsData } from "../schema";

@EntityRepository(AnalyticsData)
export class AnalyticsRepository extends MongoRepository<AnalyticsData> {}
