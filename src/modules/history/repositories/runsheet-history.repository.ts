import { EntityRepository, MongoRepository } from "typeorm";
import { RunsheetActivities } from "./../schemas/runsheet-history.schema";

@EntityRepository(RunsheetActivities)
export class RunsheetTrackingRepository extends MongoRepository<RunsheetActivities> {}
