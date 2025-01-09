import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto, UpdateShopDto } from './entitities/shop.entity';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.shopsService.findOne(uid);
  }

  @Post()
  create(@Body() dto: CreateShopDto) {
    return this.shopsService.create(dto);
  }

  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() dto: UpdateShopDto) {
    return this.shopsService.update(uid, dto);
  }

  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.shopsService.remove(uid);
  }
}
