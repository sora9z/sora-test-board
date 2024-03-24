import { Controller, Get, Query } from '@nestjs/common';
import { ResponseSearchAddressDto, SearchAddressDto } from './dto';
import { AddressService } from './address.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('address API')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/search')
  @ApiOperation({
    summary: '주소 검색',
  })
  async searchAddress(
    @Query() searchAddressDto: SearchAddressDto,
  ): Promise<ResponseSearchAddressDto[]> {
    const searchAddress =
      await this.addressService.searchAddress(searchAddressDto);
    return searchAddress;
  }
}
