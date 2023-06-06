import { Field, ObjectType } from "@nestjs/graphql";
import { paginatedType } from "src/common/pagination";
import { BaseSchema } from "src/common/schema";
import { ESource, MessageStatus } from "src/common/typeDefs";
import { Column, Entity } from "typeorm";

@Entity({
  name: "Message",
  orderBy: {
    createdAt: "DESC"
  }
})
@ObjectType()
export class Message extends BaseSchema {
  @Column()
  @Field({ description: "Phone number of the Message receveiver" })
  to: string;

  @Column({ unique: true })
  @Field({ description: "Message uid" })
  uid: string;

  @Column()
  @Field({ description: "Name of the sender" })
  sender: string;

  @Column()
  @Field({ description: "The Messge text" })
  text: string;

  @Column()
  @Field(() => MessageStatus, { description: "The Messge status" })
  status: MessageStatus;

  @Column()
  @Field(() => ESource, { description: "message source", nullable: true })
  source: ESource;

  constructor(message: Partial<Message>) {
    super(message);
  }
}

@ObjectType()
export class PaginatedFetchMessage extends paginatedType(Message) {}
