import { registerEnumType } from "@nestjs/graphql";
// All enum must be registered here
export enum EMessage {
  Sms = "SMS",
  Mail = "Email"
}

export enum MessageStatus {
  Pending = "PENDING",
  Done = "DONE",
  Failed = "FAILED"
}

registerEnumType(MessageStatus, {
  name: "MessageStatus",
  description: "Message status"
});
export enum ESource {
  Partner = "Partner",
  Papser = "Papser",
  Receiver = "Receiver",
  Client = "Client"
}

registerEnumType(ESource, { name: "EMessage", description: "Message source" });
