import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "userId")')
export class Account {
  @Field(() => ID)
  userId: string;
}
