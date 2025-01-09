import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Shop, CreateShopDto, UpdateShopDto } from './entitities/shop.entity';

@Injectable()
export class ShopsService {
  private shops: Shop[] = [
    {
      name: 'Century Trends',
      categories: ['jewely', 'clothe accessories'],
      id: 1,
      uid: '1',
    },
  ];

  findAll() {
    return this.shops;
  }

  getShop(uid: string) {
    const shop = this.shops.find(s => s.uid === uid);
    if (!shop) throw new HttpException(`Shop (${uid}) not Found`, HttpStatus.NOT_FOUND);
    return shop;
  }

  findOne(uid: string) {
    const shop: Shop = this.getShop(uid);
    return shop;
  }

  create(dto: CreateShopDto) {
    const shop: Shop = <any>{
      ...dto,
      id: this.shops.length + 1,
      uid: (this.shops.length + 1).toString(),
    };

    this.shops.push(shop);
    return shop;
  }

  update(uid: string, dto: UpdateShopDto) {
    let shop: Shop = this.getShop(uid);
    shop = <Shop>{ ...shop, ...dto };
    this.shops = this.shops.map(s => (s.uid === uid ? shop : s));
    return shop;
  }

  remove(uid: string) {
    const shop: Shop = this.getShop(uid);
    this.shops = this.shops.filter(s => s.uid !== uid);
    return shop;
  }
}
