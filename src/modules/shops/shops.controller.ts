import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto, UpdateShopDto } from './entitities/shop.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Public()
  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get('all')
  async all() {
    return await new Promise(resolve => setTimeout(resolve, 4000));
  }

  @Get(':uid')
  findOne(@Param('uid', ParseUUIDPipe) uid: string) {
    return this.shopsService.findOne(uid + '');
  }

  @Post()
  create(@Body() dto: CreateShopDto) {
    return this.shopsService.create(dto);
  }

  @Patch(':uid')
  update(@Param('uid', ParseUUIDPipe) uid: string, @Body() dto: UpdateShopDto) {
    return this.shopsService.update(uid, dto);
  }

  @Delete(':uid')
  remove(@Param('uid', ParseUUIDPipe) uid: string) {
    return this.shopsService.remove(uid);
  }
}
