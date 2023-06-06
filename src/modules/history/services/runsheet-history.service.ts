import { InjectRepository } from "@nestjs/typeorm";
import { RunsheetTrackingRepository } from "../repositories";
import { RunsheetActivities } from "../schemas";
import { BaseHistoryService } from "./base-history.service";

export class RunsheetHistoryService extends BaseHistoryService<RunsheetActivities> {
  constructor(@InjectRepository(RunsheetTrackingRepository) repository: RunsheetTrackingRepository) {
    super(repository);
  }
}
