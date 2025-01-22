import { Shop } from 'src/modules/shops/entitities/shop.entity';
import { BaseModel } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

@Entity('products')
export class Product extends BaseModel {
  @Column()
  name: string;

  @ManyToOne(() => Shop, shop => shop.products, { onDelete: 'CASCADE' })
  shop: Shop;

  @JoinTable({ name: 'categories_products' })
  @ManyToMany(() => Category, category => category.products)
  categories: Category[];

  @JoinTable({ name: ' products_tags' })
  @ManyToMany(() => Tag, tag => tag.products)
  tags: Tag[];

  @Column({ default: 0 })
  recommendations: number;
}

export class CreateProductDto {
  @IsString()
  readonly name: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
