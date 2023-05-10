import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationShutdown,
} from '@nestjs/common';
// import { PluginModule } from 'plugin';
import { AppModule } from '../app.module';
import { HealthIndicatorModule } from '../health-indicator';
import { Logger, LoggerModule } from '../logger';
import { ConfigModule } from '@nesty/config';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ConfigModule,
    AppModule,
    LoggerModule.forRoot(),
    HealthIndicatorModule,
    SharedModule,
  ],
})
export class BootstrapModule implements NestModule, OnApplicationShutdown {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }

  async onApplicationShutdown(signal: string) {
    if (signal) {
      Logger.log(`Received shutdown signal: ${signal}`);
    }
  }
}
