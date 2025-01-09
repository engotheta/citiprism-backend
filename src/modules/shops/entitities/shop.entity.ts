import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class Shop {
  id: number;
  uid: string;
  name: string;
  categories: string[];
}

export class CreateShopDto {
  @IsString()
  readonly name: string;

  @IsString({ each: true })
  readonly categories: string[];
}

export class UpdateShopDto extends PartialType(CreateShopDto) {}
