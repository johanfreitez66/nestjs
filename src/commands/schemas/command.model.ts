import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Command extends Model {
  @Column
  id: string;

  @Column
  email: string;
}
