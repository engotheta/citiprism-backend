import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Shop, CreateShopDto, UpdateShopDto } from './entitities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepo: Repository<Shop>
  ) {}

  async findOne(uid: string) {
    const shop = await this.shopsRepo.findOne({ where: { id: +uid } });
    if (!shop) throw new HttpException(`Shop (${uid}) not Found`, HttpStatus.NOT_FOUND);
    return shop;
  }

  async findAll() {
    const shops: Shop[] = await this.shopsRepo.find();
    return shops;
  }

  async create(dto: CreateShopDto) {
    const shop = this.shopsRepo.create(dto);
    await this.shopsRepo.save(shop);
    return shop;
  }

  async update(uid: string, dto: UpdateShopDto) {
    let shop: Shop = await this.findOne(uid);
    shop = await this.shopsRepo.save({ ...shop, ...dto });
    return shop;
  }

  async remove(uid: string) {
    let shop: Shop = await this.findOne(uid);
    shop = await this.shopsRepo.remove({ id: +uid, ...shop });
    return shop;
  }
}
