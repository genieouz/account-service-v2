import { InjectRepository } from "@nestjs/typeorm";
import { DefaultTrackingRepository } from "../repositories";
import { DefaultActivities } from "../schemas";
import { BaseHistoryService } from "./base-history.service";

export class DefaultHistoryService extends BaseHistoryService<DefaultActivities> {
  constructor(@InjectRepository(DefaultTrackingRepository) repository: DefaultTrackingRepository) {
    super(repository);
  }
}
