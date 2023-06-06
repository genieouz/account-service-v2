import { InjectRepository } from "@nestjs/typeorm";
import { RequestTrackingRepository } from "../repositories";
import { RequestActivities } from "../schemas";
import { BaseHistoryService } from "./base-history.service";

export class RequestHistoryService extends BaseHistoryService<RequestActivities> {
  constructor(@InjectRepository(RequestTrackingRepository) repository: RequestTrackingRepository) {
    super(repository);
  }
}
