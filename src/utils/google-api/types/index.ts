export interface GooglePlaceApiResponse {
  html_attributions?: any[];
  status: string;
  result?: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    name: string;
  };
}

export enum GoogleAddressType {
  country = "country",
  locality = "locality",
  subLocalityLevel = "sublocality_level_1",
  administrativeAreaLevel = "administrative_area_level_1"
}
