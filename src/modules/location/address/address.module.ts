import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressRepository } from "./address.repository";
import { AddressResolver } from "./resolvers/address.resolver";
import { AddressService } from "./services/address.service";

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository])],
  providers: [AddressResolver, AddressService]
})
export class AddressModule {}
