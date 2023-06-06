import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { BaseHistory } from "./base-history.schema";

@Entity({ name: "OrderActivities", orderBy: { date: "DESC" } })
@ObjectType()
export class OrderActivities extends BaseHistory {}
