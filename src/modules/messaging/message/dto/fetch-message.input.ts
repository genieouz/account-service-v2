import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class FetchMessageQuery {
  @Field({ nullable: true })
  date?: string;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
