import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAddressInput {
  @Field({ description: "address placeId input" })
  placeId: string;

  @Field({ description: "additionnal address input", nullable: true })
  additionalAddress?: string;

  @Field({ description: "source type", nullable: true })
  sourceType?: string;
}
