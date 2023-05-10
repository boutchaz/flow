// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
// import { CommandHandlers } from './commands/handlers';
import { Stock } from './stock-tracker.entity';
import { StockService } from './stock-tracker.service';
import { StockController } from './stock-tracker.controller';

@Module({
  imports: [
    RouterModule.forRoutes([{ path: '/stock', module: StockModule }]),
    forwardRef(() => TypeOrmModule.forFeature([Stock])),
    CqrsModule,
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [TypeOrmModule, StockService],
})
export class StockModule {}
