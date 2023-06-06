import { EntityRepository, MongoRepository } from "typeorm";
import { ParcelActivities } from "../schemas/parcel-history.schema";

@EntityRepository(ParcelActivities)
export class ParcelTrackingRepository extends MongoRepository<ParcelActivities> {}
