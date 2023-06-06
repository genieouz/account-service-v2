import { EntityRepository, MongoRepository } from "typeorm";
import { DefaultActivities } from "../schemas/default-history.schema";

@EntityRepository(DefaultActivities)
export class DefaultTrackingRepository extends MongoRepository<DefaultActivities> {}
