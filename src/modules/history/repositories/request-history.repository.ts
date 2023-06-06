import { EntityRepository, MongoRepository } from "typeorm";
import { RequestActivities } from "./../schemas/request-history.schema";

@EntityRepository(RequestActivities)
export class RequestTrackingRepository extends MongoRepository<RequestActivities> {}
