import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { BaseHistory } from "./base-history.schema";

@Entity({ name: "ParcelActivities", orderBy: { date: "DESC" } })
@ObjectType()
export class ParcelActivities extends BaseHistory {}
