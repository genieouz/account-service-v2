import { EntityRepository, MongoRepository } from "typeorm";
import { UserActivities } from "./../schemas/user-history.schema";

@EntityRepository(UserActivities)
export class UserTrackingRepository extends MongoRepository<UserActivities> {}
