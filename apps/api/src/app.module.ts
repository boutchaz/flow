import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { environment } from '@nesty/config';
import { StockModule } from './stock-tracker/stock-tracker.module';
import { TradingEngineModule } from './trading-engine/trading-engine.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.resolve(__dirname, '../i18n/'),
        watch: !environment.production,
      },
      resolvers: [new HeaderResolver(['language'])],
    }),
    CoreModule,
    StockModule,
    TradingEngineModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
