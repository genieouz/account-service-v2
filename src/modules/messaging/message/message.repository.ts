import { Message } from "./schema/message.schema";
import { EntityRepository, MongoRepository } from "typeorm";

@EntityRepository(Message)
export class MessageRepository extends MongoRepository<Message> {}
