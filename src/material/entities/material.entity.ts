import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MaterialState } from '../interfaces/material-states-interface';

@Entity({ name: 'material' })
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  design: string;

  @Column({
    type: 'enum',
    enum: MaterialState,
    default: MaterialState.GOOD,
  })
  state: string;

  @Column()
  quantity: number;
}
