import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { BaseHistory } from "./base-history.schema";

@Entity({ name: "RequestActivities", orderBy: { date: "DESC" } })
@ObjectType()
export class RequestActivities extends BaseHistory {}
