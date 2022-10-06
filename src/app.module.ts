import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandsModule } from './commands/commands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MomentModule } from '@ccmos/nestjs-moment';

@Dependencies(DataSource)
@Module({
  imports: [
    CommandsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '20126786',
      database: 'manzanaverdedb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    MomentModule.forRoot({
      tz: 'Asia/Taipei',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  dataSource: any;
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
}
