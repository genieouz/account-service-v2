import { ActivityContext } from "@history/enums";
import { ActivityList } from "@history/schemas/base-history.schema";
import { HistoryService } from "@history/services/history.service";
import { Query, ResolveReference, Resolver } from "@nestjs/graphql";

@Resolver(() => ActivityList)
export class ActivityListResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Query(() => [ActivityList], { nullable: "itemsAndList" })
  activities() {
    return [];
  }

  @ResolveReference()
  async activityList(reference: { __typename: string; sourceUid: string; context: ActivityContext }) {
    const activities = await this.historyService.findAllByUids({
      sourceUids: [reference.sourceUid],
      context: reference.context
    });
    return { activities, sourceUid: reference.sourceUid, context: reference.context };
  }
}
