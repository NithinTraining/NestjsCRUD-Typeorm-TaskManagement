import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    username:"postgres",
    password:'psql',
    port:5432,
    database:'task',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize:true
  }), TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection:Connection){
    console.log('status',connection.isConnected)
  }
}
