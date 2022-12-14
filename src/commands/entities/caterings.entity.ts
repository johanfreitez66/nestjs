import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Order } from './orders.entity'

@Entity('caterings')
export class Catering {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 191, nullable: false})
    name: string;

    @OneToMany(_type => Order, order => order.catering_id)
    order: Order[];
}
