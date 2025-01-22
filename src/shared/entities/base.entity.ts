import { PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, nullable: false })
  @Generated('uuid')
  uid: string;
}
