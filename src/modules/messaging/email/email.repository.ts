import { EntityRepository, MongoRepository } from "typeorm";
import { Email } from "./schema/email.schema";

@EntityRepository(Email)
export class EmailRepository extends MongoRepository<Email> {}
