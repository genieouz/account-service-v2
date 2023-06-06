import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Account } from "src/common/federation";
import {
  CreateActivitiesInput,
  CreateActivityInput,
  FindAllActivitiesByUidsInput,
  FindAllActivitiesInput
} from "../dto/create-activity.input";
import { BaseHistory } from "../schemas/base-history.schema";
import { HistoryService } from "../services/history.service";

@Resolver(() => BaseHistory)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Mutation(() => BaseHistory, { name: "addActivity" })
  create(@Args("input") input: CreateActivityInput) {
    return this.historyService.create(input);
  }

  @Mutation(() => [BaseHistory], { name: "addActivities", nullable: "itemsAndList" })
  createMany(@Args() input: CreateActivitiesInput) {
    return this.historyService.createMany(input);
  }

  @Query(() => [BaseHistory], { nullable: "itemsAndList" })
  findAllActivities(@Args() params: FindAllActivitiesInput) {
    return this.historyService.findAllActivies(params);
  }

  @Query(() => [BaseHistory], { nullable: "itemsAndList" })
  findAllActivitiesByUids(@Args() params: FindAllActivitiesByUidsInput) {
    return this.historyService.findAllByUids(params);
  }

  @ResolveField("updatedBy", () => Account, { nullable: true })
  updatedBy(@Parent() activity: BaseHistory) {
    return { __typename: "Account", userId: String(activity.triggerUserId) };
  }
}
