import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { BaseHistory } from "./base-history.schema";

@Entity({ name: "RunsheetActivities", orderBy: { date: "DESC" } })
@ObjectType()
export class RunsheetActivities extends BaseHistory {}
