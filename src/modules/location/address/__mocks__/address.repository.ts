import { ObjectId } from "mongodb";
import { AddressRepository } from "../address.repository";
import { CreateAddressInput } from "../dto/create-address.input";
import { Address } from "../schema/address.schema";

export const addressInput: CreateAddressInput = {
  placeId: "ChIJYXw6cUANwQ4RrF_kMv2Dneo",
  sourceType: "Mission"
};

const addresses: Address[] = [
  {
    _id: new ObjectId("62821d257b6061d368c4a849"),
    isDeleted: false,
    createdAt: "2022-05-16T09:45:09.114Z",
    updatedAt: "2022-05-16T09:45:09.114Z",
    place_id: "ChIJ-xXsyNATwQ4R0ZZL-kfvx28",
    city: "Ouakam",
    region: "Dakar",
    address: "Ouakam Terminus TATA N:44 et 42, Dakar, Senegal",
    country: "Senegal",
    countryCode: "SN",
    sourceType: "Mission",
    location: {
      latitude: 14.7290125,
      longitude: -17.4897442
    },
    createdBy: null,
    editedBy: null
  },
  {
    _id: new ObjectId("62821dc77b6061d368c4a84b"),
    isDeleted: false,
    createdAt: "2022-05-16T09:47:51.388Z",
    updatedAt: "2022-05-16T09:47:51.388Z",
    place_id: "ChIJ-xXsyNATwQ4R0ZZL-kfvx28",
    city: "Dieuppeul-Derkle",
    region: "Dakar",
    address: "152 Rue DD 49, Dakar, Senegal",
    country: "Senegal",
    countryCode: "SN",
    sourceType: "Mission",
    location: {
      latitude: 14.7255614,
      longitude: -17.4521779
    },
    createdBy: null,
    editedBy: null
  },
  {
    _id: new ObjectId("62821e797b6061d368c4a84c"),
    isDeleted: false,
    createdAt: "2022-05-16T09:50:49.395Z",
    updatedAt: "2022-05-16T09:50:49.395Z",
    place_id: "ChIJYXw6cUANwQ4RrF_kMv2Dneo",
    city: "Hann Bel-Air",
    region: "Dakar",
    address: "Clinical Les Maristes, Dakar, Senegal",
    country: "Senegal",
    countryCode: "SN",
    sourceType: "Mission",
    location: {
      latitude: 14.7368497,
      longitude: -17.4384969
    },
    createdBy: null,
    editedBy: null
  }
];

const newestCreatedAddress: Address[] = [
  {
    _id: new ObjectId("62821e797b6061d368c4a84c"),
    isDeleted: false,
    country: "Senegal",
    city: "Cambérène",
    region: "Dakar",
    address: "Cambérène 2, Dakar, Senegal",
    place_id: "ChIJj_lzKPoMwQ4Rkf9CtWDRqTg",
    additionalAddress: null,
    location: {
      latitude: 14.770078,
      longitude: -17.4225848
    },
    sourceType: "",
    countryCode: "SN",
    createdBy: null,
    editedBy: null,
    createdAt: "2022-05-16T09:50:49.395Z",
    updatedAt: "2022-05-16T09:50:49.395Z"
  }
];
class Aggregate {
  _skip: number;
  _limit: number;
  skip(skip: number) {
    this._skip = skip;
  }
  limit(limit: number) {
    this._limit = limit;
  }
  async toArray() {
    return addresses;
  }
}
export const addressRepository: { [k in keyof AddressRepository]?: any } = {
  create: jest.fn((payload) => payload),
  save: jest.fn((payload) => Promise.resolve(payload)),
  findOne: jest
    .fn((payload) => {
      const address = payload?.place_id
        ? addresses.find((address) => address.place_id === payload.place_id)
        : addresses.find((address) => address._id === payload._id);
      return Promise.resolve(address);
    })
    .mockResolvedValueOnce(null),
  deleteOne: jest.fn(({ _id }) => {
    const findedAddress = addresses.find((address) => address._id === _id);
    return Promise.resolve({ deletedCount: findedAddress });
  }),
  aggregate: jest.fn(() => new Aggregate()),
  aggregateEntity: jest.fn(() => new Aggregate()),
  insertMany: jest.fn((payload) => Promise.resolve({ ops: newestCreatedAddress })),
  count: jest.fn(() => Promise.resolve(3)),
  find: jest.fn(() => Promise.resolve(addresses))
};

export default addressRepository;
