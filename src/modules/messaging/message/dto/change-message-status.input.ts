import { MessageStatus } from "src/common/typeDefs";

export class ChangeMessageStatusInput {
  id: string;
  status: MessageStatus;
}
