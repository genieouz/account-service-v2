import { Field, Float, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export class ILocation {
  @Field(() => Float, { description: "Location latitude", nullable: true })
  latitude: number;

  @Field(() => Float, { description: "Location longitude", nullable: true })
  longitude: number;
}

@InterfaceType()
export class IAddress {
  @Field({ description: "Location place_id", nullable: false })
  place_id: string;

  @Field({ description: "Location city", nullable: true })
  city: string;

  @Field({ description: "Location region", nullable: true })
  region: string;

  @Field({ description: "Location address", nullable: true })
  address: string;

  @Field({ description: "Location country", nullable: true })
  country: string;

  @Field({ description: "Location country code", nullable: true })
  countryCode: string;

  @Field({ description: "Additionnal Address", nullable: true })
  additionalAddress?: string;

  @Field((type) => ILocation, {
    description: "Location input",
    nullable: true
  })
  location: ILocation;
}

export const DefaultCountry: ICountry = {
  name: "Senegal",
  code: "SN"
};

export interface ICountry {
  name: string;
  code: string;
}
