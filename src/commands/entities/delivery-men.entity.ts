import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orders.entity";

@Entity('delivery_men')
export class DeliveryMen {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'varchar', length: 191, nullable: false})
    name: string;

    @Column({type: 'time'})
    hour: Date;

    @ManyToMany(() => Order, (order) => order.deliveryMen)
    order: Order[];
}