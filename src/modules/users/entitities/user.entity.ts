import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { Shop } from 'src/modules/shops/entitities/shop.entity';
import { BaseModel } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
  @Column()
  name: string;

  @OneToMany(() => Shop, shop => shop.user, { cascade: true })
  shops: Shop[];
}

export class CreateUserDto {
  @IsString()
  readonly name: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
