import { BaseModel } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('events')
export class Event extends BaseModel {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'json' })
  payload: Record<string, any>;
}
