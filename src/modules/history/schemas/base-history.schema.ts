import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId as MongoID } from "mongodb";
import { Column, ObjectId, ObjectIdColumn } from "typeorm";
import { ActivityContext, ActivitySource, ActivityTriggerAction, ActivityTriggerFrom } from "../enums";

@ObjectType()
export class BaseHistory {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field()
  @Column({
    transformer: {
      to(value) {
        return new Date(value);
      },
      from(value) {
        return new Date(value).toISOString();
      }
    }
  })
  date: Date;

  @Field(() => ActivityTriggerAction)
  @Column()
  triggerAction: ActivityTriggerAction;

  @Field({ nullable: true })
  @Column()
  triggerActionPreviousData?: string;

  @Field({ nullable: true })
  @Column()
  triggerActionNextData?: string;

  @Field({ nullable: true })
  @Column()
  triggerActionText?: string;

  @Field()
  @Column()
  triggerActionData: string;

  @Field(() => ActivityTriggerFrom, { nullable: true })
  @Column()
  triggerUserType?: ActivityTriggerFrom;

  @Field(() => ID)
  @Column()
  triggerUserId: MongoID;

  @Field(() => ActivitySource)
  @Column()
  source: ActivitySource;

  @Field(() => ID)
  @Column()
  sourceUid: string;

  @Field(() => ActivityContext)
  @Column()
  context: ActivityContext;
}

@ObjectType()
@Directive('@key(fields: "sourceUid, context")')
export class ActivityList {
  @Field(() => ID)
  sourceUid: string;

  @Field(() => ActivityContext)
  context: ActivityContext;

  @Field(() => [BaseHistory], { nullable: "itemsAndList" })
  activities: BaseHistory[];
}
