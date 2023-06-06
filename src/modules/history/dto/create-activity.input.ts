import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";
import { ActivityContext, ActivitySource, ActivityTriggerAction, ActivityTriggerFrom } from "../enums";

@InputType()
export class CreateActivityInput {
  @Field({ nullable: true })
  date?: string;
  @Field(() => ActivityTriggerAction)
  triggerAction: ActivityTriggerAction;
  @Field({ nullable: true })
  triggerActionPreviousData?: string;
  @Field({ nullable: true })
  triggerActionNextData?: string;
  @Field({ nullable: true })
  triggerActionText?: string;
  @Field()
  triggerActionData: string;
  @Field(() => ActivityTriggerFrom, { nullable: true })
  triggerUserType?: ActivityTriggerFrom;
  @Field(() => ID)
  triggerUserId: string;
  @Field(() => ActivitySource)
  source: ActivitySource;
  @Field(() => ID)
  sourceUid: string;
  @Field(() => ActivityContext)
  context: ActivityContext;
}

@ArgsType()
export class CreateActivitiesInput {
  @Field(() => [CreateActivityInput], { nullable: false })
  activities: CreateActivityInput[];
}

@ArgsType()
export class FindAllActivitiesInput {
  @Field()
  sourceUid: string;
  @Field({ nullable: true })
  text?: string;
  @Field(() => ActivityContext)
  context: ActivityContext;
  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  page?: number;
}

@ArgsType()
export class FindAllActivitiesByUidsInput {
  @Field(() => [ID])
  sourceUids: string[];
  @Field(() => ActivityContext)
  context: ActivityContext;
  @Field(() => Int, { nullable: true })
  limit?: number;
  @Field(() => Int, { nullable: true })
  page?: number;
}
