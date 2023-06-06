import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { difference } from "lodash";
import { DefaultCountry, IAddress } from "src/common/interfaces";
import { paginate } from "src/common/pagination";
import { toObjectID, validOrFailMongoId } from "src/utils";
import { getPlaceDetails } from "src/utils/google-api/getAddress";
import { AddressRepository } from "../address.repository";
import { CreateAddressInput } from "../dto/create-address.input";
import { FetchAllAddressesParams } from "../dto/fetch-address.input";
import { Address } from "../schema/address.schema";

@Injectable()
export class AddressService {
  constructor(@InjectRepository(AddressRepository) private repo: AddressRepository) {}

  async create({ placeId, additionalAddress, sourceType }: CreateAddressInput): Promise<Address> {
    const knownAddress = await this.repo.findOne({ where: { place_id: placeId } });
    if (knownAddress)
      return {
        countryCode: DefaultCountry.code,
        ...knownAddress,
        additionalAddress
      };
    const address = await getPlaceDetails({
      placeId: placeId,
      additionalAddress: additionalAddress
    });
    const newAddress = this.repo.create({ ...address, sourceType });
    return this.repo.save(newAddress);
  }

  async findAllAddresses({ date, limit, page }: FetchAllAddressesParams) {
    return paginate({
      repo: this.repo,
      limit,
      page,
      query: {}
    });
  }

  findOneAddress(id: string) {
    validOrFailMongoId(id);
    return this.repo.findOne({ where: { _id: toObjectID(id) } });
  }

  async fetchByPlaceIds(placeIds: string[]) {
    const savedAddress = await this.repo.aggregateEntity([{ $match: { place_id: { $in: placeIds } } }]).toArray();
    const knowedPlaceIds = savedAddress.map((address) => address.place_id);
    const unknowedPlaceIds = difference(placeIds, knowedPlaceIds);
    let fetchUnkowned: IAddress[] = [];
    if (unknowedPlaceIds.length) {
      fetchUnkowned = await Promise.all(unknowedPlaceIds.map((placeId) => getPlaceDetails({ placeId })));
    }
    // TODO: return ops
    // const { ops } = (fetchUnkowned.length && (await this.repo.insertMany(fetchUnkowned))) || { ops: [] };
    // return savedAddress.concat(ops as Address[]);
    return (fetchUnkowned.length && (await this.repo.insertMany(fetchUnkowned))) || { ops: [] };
  }

  async remove(id: string) {
    validOrFailMongoId(id);
    const { deletedCount } = await this.repo.deleteOne({ _id: toObjectID(id) });
    return !!deletedCount;
  }
}
