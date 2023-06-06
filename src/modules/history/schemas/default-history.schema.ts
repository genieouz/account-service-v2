import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { BaseHistory } from "./base-history.schema";

@Entity({ name: "DefaultActivities", orderBy: { date: "DESC" } })
@ObjectType()
export class DefaultActivities extends BaseHistory {}
