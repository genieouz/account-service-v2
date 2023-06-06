import { InternalServerErrorException } from "@nestjs/common";
import axios from "axios";
import { IAddress } from "src/common/interfaces";
import { GOOGLE_API_KEY, GOOGLE_PLACE_API_URL } from "src/environments";
import { GoogleAddressType, GooglePlaceApiResponse } from "./types";

type placeSearch = {
  placeId: string;
  additionalAddress?: string;
};

export const getPlaceDetails = async ({ placeId, additionalAddress }: placeSearch): Promise<IAddress> => {
  const { data } = await axios.get<GooglePlaceApiResponse>(
    `${GOOGLE_PLACE_API_URL}?placeid=${placeId}&fields=address_components,formatted_address,geometry,name&key=${GOOGLE_API_KEY}`
  );
  if (data?.status !== "OK" || !data?.result)
    throw new InternalServerErrorException({
      message: "Cannot find place id address details"
    });
  return {
    ...formatAddress(data),
    ...(additionalAddress && { additionalAddress }),
    place_id: placeId
  };
};

const formatAddress = ({
  result: {
    address_components,
    geometry: { location },
    name
  }
}: GooglePlaceApiResponse): Omit<IAddress, "place_id"> => {
  let country: string;
  let region: string;
  let city: string;
  let countryCode: string;
  for (let { long_name, short_name, types } of address_components) {
    const addressType = types[0];
    if (addressType === GoogleAddressType.country) {
      country = long_name;
      countryCode = short_name;
    }
    if (addressType === GoogleAddressType.administrativeAreaLevel) {
      region = long_name;
    }
    if (addressType === GoogleAddressType.subLocalityLevel) {
      city = long_name;
    }
    if (!city && addressType === GoogleAddressType.locality) {
      city = long_name;
    }
  }
  return {
    country,
    city,
    countryCode,
    region,
    address: `${name}, ${region}, ${country}`,
    location: {
      latitude: location.lat,
      longitude: location.lng
    }
  };
};
