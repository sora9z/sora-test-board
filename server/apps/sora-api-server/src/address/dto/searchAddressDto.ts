import { AddressDto } from './address.dto';

export class SearchAddressDto {
  query: string;
}

export class ResponseSearchAddressDto extends AddressDto {}
