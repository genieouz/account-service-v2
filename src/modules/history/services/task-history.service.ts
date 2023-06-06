import { InjectRepository } from "@nestjs/typeorm";
import { TaskTrackingRepository } from "../repositories";
import { TaskActivities } from "../schemas";
import { BaseHistoryService } from "./base-history.service";

export class TaskHistoryService extends BaseHistoryService<TaskActivities> {
  constructor(@InjectRepository(TaskTrackingRepository) repository: TaskTrackingRepository) {
    super(repository);
  }
}
