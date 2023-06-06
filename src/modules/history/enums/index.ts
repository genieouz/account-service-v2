import { registerEnumType } from "@nestjs/graphql";

export enum ActivityTriggerAction {
  CREATED = "CREATED",
  UPLOADED = "UPLOADED",
  ADDED = "ADDED",
  UPDATED = "UPDATED",
  EDITED = "EDITED",
  EDITED_PARCEL_VALUE = "EDITED_PARCEL_VALUE",
  EDITED_PARCEL_AMOUNT_TO_COLLECT = "EDITED_PARCEL_AMOUNT_TO_COLLECT",
  EDITED_ORDER_ADDRESS = "EDITED_ORDER_ADDRESS",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
  STATUS_UPDATED = "STATUS_UPDATED",
  TAG_UPDATED = "TAG_UPDATED",
  UNASSIGNED = "UNASSIGNED",
  PARCEL_ADDED = "PARCEL_ADDED",
  PARCEL_DELETED = "PARCEL_DELETED",
  ASSIGNED = "ASSIGNED",
  REASSIGNED = "REASSIGNED",
  HANDED_OVER = "HANDED_OVER",
  TRANSFERED = "TRANSFERED",
  RECONCILED = "RECONCILED",
  NOT_RECEIVED = "NOT_RECEIVED",
  NOT_COLLECTED = "NOT_COLLECTED",
  RECEIVED_AT_RELAY = "RECEIVED_AT_RELAY",
  CANCELLED_AT_RELAY = "CANCELLED_AT_RELAY",
  GIVEN_TO_RECEIVER = "GIVEN_TO_RECEIVER",
  ON_RETURN_TO_HUB = "ON_RETURN_TO_HUB",
  ACTION_RELAY_OPENED = "ACTION_RELAY_OPENED",
  CONFIRMATION_CODE_TO_REMIT_FROM_RELAY = "CONFIRMATION_CODE_TO_REMIT_FROM_RELAY",
  RECEIVED_BY_CLIENT = "RECEIVED_BY_CLIENT",
  NOT_RECEIVED_BY_CLIENT = "NOT_RECEIVED_BY_CLIENT",
  RESEND_BY_OPS = "RESEND_BY_OPS",
  OUT_OF_ZONE_CHECK = "OUT_OF_ZONE_CHECK",
  EARLY_CHECK = "EARLY_CHECK",
  LATE_CHECK = "LATE_CHECK",
  CHECK_COMPLETED = "CHECK_COMPLETED",
  MAD_MISSION_SUSPENDED = "MAD_MISSION_SUSPENDED",
  MAD_MISSION_COMPLETED = "MAD_MISSION_COMPLETED",
  ADDED_IN_REMITTANCE = "ADDED_IN_REMITTANCE"
}

registerEnumType(ActivityTriggerAction, { name: "EActivityTriggerAction" });

export enum ActivityTriggerFrom {
  Ops = "Ops",
  Client = "Client",
  Papser = "Papser"
}

registerEnumType(ActivityTriggerFrom, { name: "EActivityTriggerFrom" });

export enum ActivityContext {
  Parcel = "Parcel",
  Order = "Order",
  Runsheet = "Runsheet",
  Request = "Request",
  Task = "Task",
  User = "User",
  Default = "Default"
}

registerEnumType(ActivityContext, { name: "EActivityContext" });

export enum ActivitySource {
  Staff = "Staff",
  Partner = "Partner",
  Client = "Client"
}

registerEnumType(ActivitySource, { name: "EActivitySource" });
