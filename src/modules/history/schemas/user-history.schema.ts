import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { BaseHistory } from "./base-history.schema";

@Entity({ name: "UserActivities", orderBy: { date: "DESC" } })
@ObjectType()
export class UserActivities extends BaseHistory {}
