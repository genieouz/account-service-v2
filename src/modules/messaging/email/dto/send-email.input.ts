import { Field, InputType, Int } from "@nestjs/graphql";
import { VariableInput } from "./variables.input";

@InputType()
export class SendEmailInput {
  @Field({ description: "Email of the Receiver" })
  toEmail: string;
  @Field({ description: "Name of the Receiver" })
  toName: string;

  @Field({ description: "Subject of Email" })
  subject: string;

  @Field({ description: "Subject of Email", nullable: false })
  withRedirection: boolean;

  @Field(() => Int, { description: "Email template ID", nullable: true })
  templateId?: number;

  @Field(() => VariableInput, {
    description: "Name of the Sender",
    nullable: true
  })
  variables?: VariableInput;
}
