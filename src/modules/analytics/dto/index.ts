import { Field, InputType } from "@nestjs/graphql";
import { ExportType } from "../enum";

@InputType()
export class FindParcelsAnalyticDataDto {
  @Field(() => [String], { nullable: false })
  parcels: string[];
  @Field({ nullable: true })
  isCron?: boolean;
}

@InputType()
export class TasksExportInputQueries {
  @Field()
  data: string;
  @Field(() => ExportType)
  type: ExportType;
  @Field()
  title: string;
}
