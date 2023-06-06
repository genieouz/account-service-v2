import { Directive, Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { BaseSchema } from "src/common/schema";
import { Column, Entity } from "typeorm";

@ObjectType()
export class Location {
  @Field((type) => Float, { nullable: true })
  @Column()
  latitude: number;

  @Field((type) => Float, { nullable: true })
  @Column()
  longitude: number;
}

@Entity({ name: "Addresses" })
@ObjectType()
@Directive('@key(fields: "place_id")')
export class Address extends BaseSchema {
  @Field(() => ID)
  @Column()
  place_id: string;

  @Field({ nullable: true })
  @Column()
  city: string;

  @Field({ nullable: true })
  @Column()
  region: string;

  @Field({ nullable: true })
  @Column()
  address: string;

  @Field({ nullable: true })
  @Column()
  country: string;

  @Field({ description: "Additionnal Address", nullable: true })
  @Column()
  additionalAddress?: string;

  @Field({ nullable: true })
  @Column()
  countryCode: string;

  @Field({ nullable: true })
  @Column()
  sourceType: string;

  @Field((type) => Location)
  @Column((type) => Location)
  location: Location;

  constructor(partial: Partial<Address>) {
    super(partial);
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
