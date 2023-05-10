import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nesty/config';
import { SeedDataService } from './seed-data.service';
import { DatabaseModule } from './../../database/database.module';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [ConfigModule],
  providers: [SeedDataService],
  exports: [SeedDataService],
})
export class SeederModule {
  static forPlugins(): DynamicModule {
    return {
      module: SeederModule,
      providers: [],
      imports: [DatabaseModule],
      exports: [],
    } as DynamicModule;
  }
}
