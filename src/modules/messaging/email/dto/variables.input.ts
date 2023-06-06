import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class VariableInput {
  @Field({ description: "Variable Title" })
  title: string;
  @Field({ nullable: true })
  dear?: string;
  @Field({ description: "Variable FirstName", nullable: true })
  firstname: string;
  @Field({ description: "Variable Message" })
  message: string;
  @Field({ description: "Variable Button Name", nullable: true })
  buttonName?: string;
  @Field({ description: "Variable Button Link", nullable: true })
  buttonLink?: string;
}
