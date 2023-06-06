import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LocationInput {
  @Field({ description: "Location latitude", nullable: true })
  latitude?: number;

  @Field({ description: "Location longitude", nullable: true })
  longitude?: number;
}

@InputType()
export class AddressInput {
  @Field({ description: "Location place_id", nullable: false })
  place_id!: string;

  @Field({ description: "Location city", nullable: true })
  city?: string;

  @Field({ description: "Location region", nullable: true })
  region?: string;

  @Field({ description: "Location address", nullable: true })
  address?: string;

  @Field({ description: "Location country", nullable: true })
  country?: string;

  @Field((type) => LocationInput, {
    description: "Location input",
    nullable: true
  })
  location?: LocationInput;
}
