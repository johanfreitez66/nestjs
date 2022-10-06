import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandsController } from './commands.controller';
import { CommandsService } from './commands.service';
import { Order, Catering } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Catering])],
  controllers: [CommandsController],
  providers: [CommandsService],
})
export class CommandsModule {}
