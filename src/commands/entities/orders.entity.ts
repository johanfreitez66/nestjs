import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Catering } from './caterings.entity';
import { Customer } from './customers.entity';
import { DeliveryMen } from './delivery-men.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: Date, nullable: false})
    date: Date;

    @Column({type: Boolean, nullable: true})
    want_cutlery: Boolean;

    @Column({type: 'integer', nullable: false})
    status_id: number;
    
    @Column({type: 'integer', nullable: false})
    catering_id: number;

    @ManyToOne(
        _type => Catering,
        catering => catering.id,
        {cascade: true},
    )
    @JoinColumn({name: 'catering_id'})
    catering: Catering;

    @Column({type: 'integer', nullable: false})
    customer_id: number;

    @ManyToOne(
        _type => Customer,
        customer => customer.id,
        {cascade: true},
    )
    @JoinColumn({name: 'customer_id'})
    customer: Customer;


    @ManyToMany(() => DeliveryMen, (deliveryMen) => deliveryMen.order)   
    @JoinTable({
        name: 'order_delivery_men',
        joinColumn: {
            name: 'order_id',
        },
        inverseJoinColumn: {
            name: 'delivery_men_id',
        },
    })
    deliveryMen: DeliveryMen;
}
