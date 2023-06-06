import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { paginatedType } from "src/common/pagination";
import { Address } from "../schema/address.schema";

@InputType()
export class FetchAddressesByPlaceIds {
  @Field(() => [String], { nullable: false })
  placeIds: string[];
}

@InputType()
export class FetchAllAddressesParams {
  @Field({ nullable: true })
  date?: string;
  @Field(() => Int, { nullable: true })
  page?: number;
  @Field(() => Int, { nullable: true })
  limit?: number;
}

@ObjectType()
export class AllAddressesResponse extends paginatedType(Address) {}
