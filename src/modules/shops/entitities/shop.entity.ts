import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entitities/user.entity';
import { BaseModel } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('shops')
export class Shop extends BaseModel {
  @Column()
  name: string;

  @Column({ type: 'json', nullable: true })
  categories: string[];

  @OneToMany(() => Product, product => product.shop, { cascade: true })
  products: Product[];

  @ManyToOne(() => User, user => user.shops)
  user: User;
}

export class CreateShopDto {
  @IsString()
  readonly name: string;

  @IsString({ each: true })
  readonly categories: string[];
}

export class UpdateShopDto extends PartialType(CreateShopDto) {}
