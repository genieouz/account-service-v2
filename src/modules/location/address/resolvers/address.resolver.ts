import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateAddressInput } from "../dto/create-address.input";
import { AllAddressesResponse, FetchAddressesByPlaceIds, FetchAllAddressesParams } from "../dto/fetch-address.input";
import { Address } from "../schema/address.schema";
import { AddressService } from "../services/address.service";

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation(() => Address, { name: "createOrFindAddress" })
  createAddress(@Args("input") input: CreateAddressInput) {
    return this.addressService.create(input);
  }

  @Query(() => AllAddressesResponse, { name: "findAllAddresses" })
  findAll(@Args("params", { nullable: true }) params: FetchAllAddressesParams) {
    return this.addressService.findAllAddresses(params || {});
  }

  @Query(() => Address, { name: "findAddress" })
  findAddressById(@Args("id", { type: () => String }) id: string) {
    return this.addressService.findOneAddress(id);
  }

  @Query(() => [Address], { nullable: "items" })
  fetchAddressesByPlaceIds(@Args("params") params: FetchAddressesByPlaceIds) {
    return this.addressService.fetchByPlaceIds(params.placeIds);
  }

  @Mutation(() => Boolean)
  removeAddress(@Args("id", { type: () => ID }) id: string) {
    return this.addressService.remove(id);
  }
}
