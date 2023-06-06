import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { BaseHistory } from "./base-history.schema";

@Entity({ name: "TaskActivities", orderBy: { date: "DESC" } })
@ObjectType()
export class TaskActivities extends BaseHistory {}
