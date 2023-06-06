import { InjectRepository } from "@nestjs/typeorm";
import { UserTrackingRepository } from "../repositories";
import { UserActivities } from "../schemas";
import { BaseHistoryService } from "./base-history.service";

export class UserHistoryService extends BaseHistoryService<UserActivities> {
  constructor(@InjectRepository(UserTrackingRepository) repository: UserTrackingRepository) {
    super(repository);
  }
}
