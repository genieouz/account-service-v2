import { ActivityContext, ActivitySource, ActivityTriggerAction, ActivityTriggerFrom } from "@history/enums";
import { BaseHistory } from "@history/schemas/base-history.schema";
import { ObjectId } from "mongodb";
import {
  CreateActivityInput,
  FindAllActivitiesByUidsInput,
  FindAllActivitiesInput
} from "../dto/create-activity.input";

const activityInput: CreateActivityInput = {
  context: ActivityContext.Order,
  sourceUid: "PP-O-124340",
  date: "2022-06-29",
  triggerAction: ActivityTriggerAction.CREATED,
  triggerUserId: "627542accc2e4e0be4ad4a2e",
  triggerUserType: ActivityTriggerFrom.Papser,
  source: ActivitySource.Staff,
  triggerActionData: "TO_PICK"
};

const activitiesInput: CreateActivityInput[] = [
  {
    context: ActivityContext.Order,
    sourceUid: "PP-O-124341",
    date: "2022-06-29",
    triggerAction: ActivityTriggerAction.CREATED,
    triggerUserId: "627542accc2e4e0be4ad4a2e",
    triggerUserType: ActivityTriggerFrom.Papser,
    source: ActivitySource.Staff,
    triggerActionData: "TO_PICK"
  },
  {
    context: ActivityContext.Parcel,
    sourceUid: "PP-O-124342",
    date: "2022-06-29",
    triggerAction: ActivityTriggerAction.CREATED,
    triggerUserId: "627542accc2e4e0be4ad4a2e",
    triggerUserType: ActivityTriggerFrom.Papser,
    source: ActivitySource.Staff,
    triggerActionData: "TO_PICK"
  },
  {
    context: ActivityContext.Runsheet,
    sourceUid: "PP-O-124343",
    date: "2022-06-29",
    triggerAction: ActivityTriggerAction.CREATED,
    triggerUserId: "627542accc2e4e0be4ad4a2e",
    triggerUserType: ActivityTriggerFrom.Papser,
    source: ActivitySource.Staff,
    triggerActionData: "TO_PICK"
  },
  {
    context: ActivityContext.Request,
    sourceUid: "PP-O-124344",
    date: "2022-06-29",
    triggerAction: ActivityTriggerAction.CREATED,
    triggerUserId: "627542accc2e4e0be4ad4a2e",
    triggerUserType: ActivityTriggerFrom.Papser,
    source: ActivitySource.Staff,
    triggerActionData: "TO_PICK"
  },
  {
    context: ActivityContext.Default,
    sourceUid: "PP-O-124345",
    date: "2022-06-29",
    triggerAction: ActivityTriggerAction.CREATED,
    triggerUserId: "627542accc2e4e0be4ad4a2e",
    triggerUserType: ActivityTriggerFrom.Papser,
    source: ActivitySource.Staff,
    triggerActionData: "TO_PICK"
  },
  {
    context: ActivityContext.User,
    sourceUid: "PP-O-124346",
    date: "2022-06-29",
    triggerAction: ActivityTriggerAction.CREATED,
    triggerUserId: "627542accc2e4e0be4ad4a2e",
    triggerUserType: ActivityTriggerFrom.Papser,
    source: ActivitySource.Staff,
    triggerActionData: "TO_PICK"
  },
  {
    context: ActivityContext.Task,
    sourceUid: "PP-O-124347",
    date: "2022-06-29",
    triggerAction: ActivityTriggerAction.CREATED,
    triggerUserId: "627542accc2e4e0be4ad4a2e",
    triggerUserType: ActivityTriggerFrom.Papser,
    source: ActivitySource.Staff,
    triggerActionData: "TO_PICK"
  }
];
const activities: BaseHistory[] = [
  {
    _id: new ObjectId("62bc7dfe54e505bde13bb782"),
    date: new Date(),
    triggerAction: ActivityTriggerAction.CREATED,
    triggerActionData: "TO_PICK",
    triggerUserType: ActivityTriggerFrom.Ops,
    triggerUserId: new ObjectId("627542accc2e4e0be4ad4a2e"),
    source: ActivitySource.Staff,
    sourceUid: "PP-O-124340",
    context: ActivityContext.Order
  },
  {
    _id: new ObjectId("62bc7e6154e505bde13bb783"),
    date: new Date(),
    triggerAction: ActivityTriggerAction.UPDATED,
    triggerActionData: "TO_PICK",
    triggerUserType: ActivityTriggerFrom.Client,
    triggerUserId: new ObjectId("627542accc2e4e0be4ad4a2e"),
    source: ActivitySource.Partner,
    sourceUid: "PP-O-124341",
    context: ActivityContext.Parcel
  },
  {
    _id: new ObjectId("62bcddd9d1124bc76e635a0e"),
    date: new Date(),
    triggerAction: ActivityTriggerAction.UPDATED,
    triggerActionData: "PICKED",
    triggerUserType: ActivityTriggerFrom.Client,
    triggerUserId: new ObjectId("627542accc2e4e0be4ad4a2e"),
    source: ActivitySource.Client,
    sourceUid: "PP-O-124342",
    context: ActivityContext.Runsheet
  },
  {
    _id: new ObjectId("62bcddd9d1124bc76e635a0e"),
    date: new Date(),
    triggerAction: ActivityTriggerAction.UPDATED,
    triggerActionData: "PICKED",
    triggerUserType: ActivityTriggerFrom.Client,
    triggerUserId: new ObjectId("627542accc2e4e0be4ad4a2e"),
    source: ActivitySource.Client,
    sourceUid: "PP-O-124343",
    context: ActivityContext.Request
  },
  {
    _id: new ObjectId("62bcddd9d1124bc76e635a0e"),
    date: new Date(),
    triggerAction: ActivityTriggerAction.UPDATED,
    triggerActionData: "PICKED",
    triggerUserType: ActivityTriggerFrom.Client,
    triggerUserId: new ObjectId("627542accc2e4e0be4ad4a2e"),
    source: ActivitySource.Client,
    sourceUid: "PP-O-124344",
    context: ActivityContext.Task
  },
  {
    _id: new ObjectId("62bcddd9d1124bc76e635a0e"),
    date: new Date(),
    triggerAction: ActivityTriggerAction.UPDATED,
    triggerActionData: "PICKED",
    triggerUserType: ActivityTriggerFrom.Client,
    triggerUserId: new ObjectId("627542accc2e4e0be4ad4a2e"),
    source: ActivitySource.Client,
    sourceUid: "PP-O-124345",
    context: ActivityContext.Default
  },
  {
    _id: new ObjectId("62bcddd9d1124bc76e635a0e"),
    date: new Date(),
    triggerAction: ActivityTriggerAction.UPDATED,
    triggerActionData: "PICKED",
    triggerUserType: ActivityTriggerFrom.Client,
    triggerUserId: new ObjectId("627542accc2e4e0be4ad4a2e"),
    source: ActivitySource.Client,
    sourceUid: "PP-O-124346",
    context: ActivityContext.User
  }
];

const findAcitivitiesInput: FindAllActivitiesInput[] = [
  {
    context: ActivityContext.Order,
    sourceUid: "PP-O-124340",
    text: "Order"
  },
  {
    context: ActivityContext.Parcel,
    sourceUid: "PP-O-124341",
    text: "Parcel"
  },
  {
    context: ActivityContext.Request,
    sourceUid: "PP-O-124342",
    text: "Request"
  },
  {
    context: ActivityContext.Runsheet,
    sourceUid: "PP-O-124343",
    text: "Runsheet"
  },
  {
    context: ActivityContext.Task,
    sourceUid: "PP-O-124344",
    text: "Task"
  },
  {
    context: ActivityContext.Default,
    sourceUid: "PP-O-124345",
    text: "Default"
  },
  {
    context: ActivityContext.User,
    sourceUid: "PP-O-124346",
    text: "User"
  }
];

const findAcitivitiesByUidInput: FindAllActivitiesByUidsInput[] = [
  {
    context: ActivityContext.Order,
    sourceUids: ["PP-O-124340"]
  },
  {
    context: ActivityContext.Parcel,
    sourceUids: ["PP-O-124341"]
  },
  {
    context: ActivityContext.Request,
    sourceUids: ["PP-O-124342"]
  },
  {
    context: ActivityContext.Runsheet,
    sourceUids: ["PP-O-124343"]
  },
  {
    context: ActivityContext.Task,
    sourceUids: ["PP-O-124344"]
  },
  {
    context: ActivityContext.Default,
    sourceUids: ["PP-O-124345"]
  },
  {
    context: ActivityContext.User,
    sourceUids: ["PP-O-124346"]
  }
];

export { activities, activityInput, activitiesInput, findAcitivitiesInput, findAcitivitiesByUidInput };
