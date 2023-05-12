// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { TradingEngineController } from './trading-engine.controller';
import { TradingEngineService } from './trading-engine.service';
import { StockModule } from 'src/stock-tracker/stock-tracker.module';

@Module({
  imports: [
    RouterModule.forRoutes([{ path: '/engine', module: TradingEngineModule }]),
    StockModule,
    CqrsModule,
  ],
  controllers: [TradingEngineController],
  providers: [TradingEngineService],
  exports: [TradingEngineService],
})
export class TradingEngineModule {}
