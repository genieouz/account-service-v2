import { HttpStatus } from "@nestjs/common";
import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { FindParcelsAnalyticDataDto, TasksExportInputQueries } from "../dto";
import { AnalyticsService } from "../services/analytics.service";

@Resolver()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => String, { name: "findParcelToExport", nullable: true })
  async fetchParcelAnalyticsData(@Args("queries") queries: FindParcelsAnalyticDataDto): Promise<string> {
    return await this.analyticsService.findParcelsData(queries);
  }

  @Query(() => Int, { nullable: true })
  tasksExport(@Args("queries", { type: () => [TasksExportInputQueries] }) queries: TasksExportInputQueries[]) {
    this.analyticsService.tasksExport(queries);
    return HttpStatus.OK;
  }
}
