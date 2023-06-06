import { DeepPartial, MongoRepository } from "typeorm";
import { FindAllActivitiesByUidsInput, FindAllActivitiesInput } from "../dto/create-activity.input";
import { BaseHistory } from "../schemas/base-history.schema";

export class BaseHistoryService<E extends BaseHistory> {
  constructor(private repository: MongoRepository<E>) {}

  async insertOne(payload: Partial<E>) {
    const activity = this.repository.create(payload as DeepPartial<E>);
    // TODO: Return Ops
    // const { ops } = await this.repository.insertOne(activity);
    // return ops[0] as E;
    return this.repository.insertOne(activity)
  }

  async insertManyActivities(payload: Partial<E>[]) {
    const activities = this.repository.create(payload as DeepPartial<E>[]);
    // TODO: return ops
    // const { ops } = await this.repository.insertMany(activities);
    // return ops as E[];
    return this.repository.insertMany(activities);
  }

  async findAll(
    { sourceUid, text, limit = 100, page = 0 }: FindAllActivitiesInput,
    sortBy?: { [k in keyof E]?: "ASC" | "DESC" | 1 | -1 }
  ) {
    const where = {
      sourceUid,
      ...(text && { $text: { $search: text } })
    };
    const activities = await this.repository.find({ where, take: limit, skip: page, ...(sortBy && { order: sortBy }) });
    return activities;
  }

  async findAllByUids(
    { sourceUids, page = 0, limit = 100 }: FindAllActivitiesByUidsInput,
    sortBy?: { [k in keyof E]?: "ASC" | "DESC" | 1 | -1 }
  ) {
    const where = {
      sourceUid: { $in: [...sourceUids] }
    };
    const activities = await this.repository.find({ where, take: limit, skip: page, ...(sortBy && { order: sortBy }) });
    return activities;
  }
}
