import { Field, Int, InterfaceType, ObjectType } from "@nestjs/graphql";
import { paginatedType } from "src/common/pagination";
import { BaseSchema } from "src/common/schema";
import { MessageStatus } from "src/common/typeDefs";
import { Column, Entity } from "typeorm";
import { mailjetSender } from "../constants";

@InterfaceType()
class Variable {
  @Field({ description: "Variable Title" })
  @Column()
  title: string;

  @Field({ description: "Variable Title", nullable: true })
  @Column()
  dear: string;

  @Field({ description: "Variable FirstName" })
  @Column()
  firstname: string;

  @Field({ description: "Variable Message" })
  @Column()
  message: string;

  @Field({ description: "Variable Button Name", nullable: true })
  @Column()
  buttonName?: string;

  @Field({ description: "Variable Button Link", nullable: true })
  @Column()
  buttonLink?: string;
}

@ObjectType()
@Entity({
  name: "Email",
  orderBy: {
    createdAt: "DESC"
  }
})
export class Email extends BaseSchema {
  @Column()
  @Field({ description: "Email uid" })
  uid: string;

  @Field({ description: "Email of the Receiver" })
  @Column()
  toEmail: string;

  @Field({ description: "Name of the Receiver" })
  @Column()
  toName: string;

  @Field({ description: "Subject of Email" })
  @Column()
  subject: string;

  @Field({ description: "Email of the Sender" })
  @Column()
  fromEmail: string;

  @Field({ description: "Name of the Sender" })
  @Column()
  fromName: string;

  @Field({ description: "Name of the Sender" })
  @Column()
  withRedirection: boolean;

  @Field(() => Int, { description: "Email template ID" })
  @Column()
  templateId: number;

  @Column()
  @Field(() => MessageStatus, { description: "The Messge status" })
  status: MessageStatus;

  @Field(() => Variable, { description: "Variable ", nullable: true })
  @Column({ nullable: true })
  variables?: Variable;
  constructor(email: Partial<Email>) {
    super(email);
    this.fromEmail = mailjetSender.email;
    this.fromName = mailjetSender.name;
    this.status = MessageStatus.Pending;
  }
}

@ObjectType()
export class FetchEmailResponse extends paginatedType(Email) {}
