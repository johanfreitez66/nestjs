import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orders.entity";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'varchar', length: 191, nullable: false})
    name: string;

    @OneToMany(_type => Order, order => order.customer_id)
    order: Order[];
}