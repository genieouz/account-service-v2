import { Field, InputType } from "@nestjs/graphql";
import { ESource } from "src/common/typeDefs";

@InputType()
export class SendMessageInput {
  @Field({ description: "Phone number of the Message receveiver" })
  to: string;

  @Field({ description: "Name of the sender" })
  sender: string;

  @Field({ description: "The Messge text" })
  text: string;

  @Field(() => ESource, { description: "message source", nullable: true })
  source?: ESource;
}
