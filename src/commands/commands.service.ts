import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Order } from './entities';

@Injectable()
export class CommandsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getCommands() {

    const data = await this.orderRepository.find({
      relations: {
        catering: true,
        customer: true,
        deliveryMen: true,
      },
      where: {
        date: new Date('2022/06/15'),
        status_id: Not(2),
        catering_id : 75,
      }
    });

    if (!data)  throw new NotFoundException('Commands does not exist or unauthorized');

    return data;
  }
}


