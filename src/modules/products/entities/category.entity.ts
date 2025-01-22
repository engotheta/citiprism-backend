import { BaseModel } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Product } from './product.entity';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

@Entity('categories')
export class Category extends BaseModel {
  @Column()
  name: string;

  @ManyToMany(() => Product, product => product.categories)
  products: Product[];
}

export class CreateCategoryDto {
  @IsString()
  readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
