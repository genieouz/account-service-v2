import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import axios from "axios";
import { AddressRepository } from "../address.repository";
import addressRepository, { addressInput } from "../__mocks__/address.repository";
import { googleResponse } from "../__stubs__";
import { AddressService } from "./address.service";

jest.mock("axios");

describe("AddressService", () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressRepository),
          useValue: addressRepository
        }
      ]
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create an address", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: googleResponse });
    const address = await service.create(addressInput);
    expect(address.place_id).toBe("ChIJYXw6cUANwQ4RrF_kMv2Dneo");
    expect(address.address).toBe("Mariste, Dakar, Senegal");
    const knowedAddress = await service.create({
      placeId: "ChIJ-xXsyNATwQ4R0ZZL-kfvx28"
    });
    expect(knowedAddress.city).toBe("Ouakam");
  });

  it("should find all address", async () => {
    const { data } = await service.findAllAddresses({});
    expect(data.length).toBe(3);
  });

  it("should fetch address by place ids", async () => {
    const addressByPlaceIds = await service.fetchByPlaceIds([
      "ChIJ-xXsyNATwQ4R0ZZL-kfvx28",
      "ChIJ-xXsyNATwQ4R0ZZL-kfvx28",
      "ChIJYXw6cUANwQ4RrF_kMv2Dneo",
      "ChIJj_lzKPoMwQ4Rkf9CtWDRqTg"
    ]);
    expect(addressByPlaceIds.length).toBe(4);
  });

  it("should find one address", async () => {
    const address = await service.findOneAddress("601968b963207e0022febbaa");
    expect(address).toBeUndefined();
  });

  it("should remove address by id", async () => {
    const isDeleted = await service.remove("62821e797b6061d368c4a84c");
    expect(isDeleted).toBeFalsy();
  });
});
