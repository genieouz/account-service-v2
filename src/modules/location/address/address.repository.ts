import { EntityRepository, MongoRepository } from "typeorm";
import { Address } from "./schema/address.schema";

@EntityRepository(Address)
export class AddressRepository extends MongoRepository<Address> {}
