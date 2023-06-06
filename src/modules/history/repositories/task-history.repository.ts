import { EntityRepository, MongoRepository } from "typeorm";
import { TaskActivities } from "./../schemas/task-history.schema";

@EntityRepository(TaskActivities)
export class TaskTrackingRepository extends MongoRepository<TaskActivities> {}
