import { BaseModel } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Product } from './product.entity';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

@Entity('tags')
export class Tag extends BaseModel {
  @Column()
  name: string;

  @ManyToMany(() => Product, product => product.tags)
  products: Product[];
}

export class CreateTagDto {
  @IsString()
  readonly name: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto) {}
