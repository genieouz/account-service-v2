import { InjectRepository } from "@nestjs/typeorm";
import { ParcelTrackingRepository } from "../repositories";
import { ParcelActivities } from "../schemas";
import { BaseHistoryService } from "./base-history.service";

export class ParcelHistoryService extends BaseHistoryService<ParcelActivities> {
  constructor(@InjectRepository(ParcelTrackingRepository) repository: ParcelTrackingRepository) {
    super(repository);
  }
}
