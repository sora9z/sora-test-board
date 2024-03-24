import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';

import { ResponseSearchAddressDto, SearchAddressDto } from './dto';

type TSearchAddressItem = {
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  addressElements: object[];
  x: string;
  y: string;
  distance: number;
};

@Injectable()
export class AddressService {
  constructor(private readonly httpService: HttpService) {}
  async searchAddress(
    searchAddressDto: SearchAddressDto,
  ): Promise<ResponseSearchAddressDto[]> {
    const url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      headers: {
        'X-NCP-APIGW-API-KEY-ID': 'lrkhgh6gxw',
        'X-NCP-APIGW-API-KEY': 'KUasHmN0UYkF8A9BiHKBnTr8qABrYLcnWBVfWPLN',
      },
      params: { query: searchAddressDto.query },
    };

    let result: ResponseSearchAddressDto[];

    try {
      const { data } = await this.httpService.axiosRef.request(config);
      const searchResultsFromThirdParty: TSearchAddressItem[] = data.addresses;

      result = searchResultsFromThirdParty.map((address) => {
        const transformedAddress: ResponseSearchAddressDto = {
          originalLandAddress: address.jibunAddress,
          originalRoadAddress: address.roadAddress,
          point: {
            longitude: Number(address.x),
            latitude: Number(address.y),
          },
        };
        return transformedAddress;
      });

      return result;
    } catch (err) {
      throw err;
    }
  }
}
