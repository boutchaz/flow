// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor

import * as rimraf from 'rimraf';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as chalk from 'chalk';
import * as moment from 'moment';
import { environment as env, ConfigService } from '@nesty/config';

import { createStocks } from '../../stock-tracker/stock-tracker.seed';
import { IStock } from '@nesty/contracts';

export enum SeederTypeEnum {
  ALL = 'all',
  EVER = 'ever',
  DEFAULT = 'default',
}

@Injectable()
export class SeedDataService {
  log = console.log;
  seedType: SeederTypeEnum;
  defaultEmployees: IStock[] = [];

  dataSource: DataSource;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly configService: ConfigService,
  ) {}

  /**
   * This config is applied only for `yarn seed:*` type calls because
   * that is when connection is created by this service itself.
   */
  overrideDbConfig = {
    logging: 'all',
    logger: 'file', //Removes console logging, instead logs all queries in a file ormlogs.log
    // dropSchema: !env.production //Drops the schema each time connection is being established in development mode.
  };

  /**
   * Seed All Data
   */
  public async runAllSeed() {
    try {
      this.seedType = SeederTypeEnum.ALL;

      await this.cleanUpPreviousRuns();

      // Connect to database
      await this.createConnection();

      // Reset database to start with new, fresh data
      await this.resetDatabase();

      // Seed basic default data for default tenant
      await this.seedBasicDefaultData();

      // Seed reports related data
      await this.seedReportsData();

      // Seed data with mock / fake data for default tenant
      await this.seedDefaultData();

      // Seed data with mock / fake data for random tenants
      await this.seedRandomData();

      // Seed jobs related data
      await this.seedJobsData();

      // Disconnect to database
      await this.closeConnection();

      console.log('Database All Seed Completed');
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Seed Default Data
   */
  public async runDefaultSeed(fromAPI: boolean) {
    try {
      await this.cleanUpPreviousRuns();

      // Connect to database
      await this.createConnection();

      // Reset database to start with new, fresh data
      await this.resetDatabase();

      // Seed basic default data for default tenant
      await this.seedBasicDefaultData();

      // Seed reports related data
      await this.seedReportsData();

      // Disconnect to database
      await this.closeConnection();

      console.log('Database Default Seed Completed');
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Seed Default Ever Data
   */
  public async runEverSeed() {
    try {
      this.seedType = SeederTypeEnum.EVER;

      await this.cleanUpPreviousRuns();

      // Connect to database
      await this.createConnection();

      // Reset database to start with new, fresh data
      await this.resetDatabase();

      // Seed basic default data for default tenant
      await this.seedBasicDefaultData();

      // Seed reports related data
      await this.seedReportsData();

      // Disconnect to database
      await this.closeConnection();

      console.log('Database Ever Seed Completed');
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Seed Default Report Data
   */
  public async runReportsSeed() {
    try {
      // Connect to database
      await this.createConnection();

      // Seed reports related data
      await this.seedReportsData();

      // Disconnect to database
      await this.closeConnection();

      console.log('Database Reports Seed Completed');
    } catch (error) {
      this.handleError(error);
    }
    return;
  }

  /**
   * Seed Default & Random Data
   */
  public async executeDemoSeed() {
    try {
      console.log('Database Demo Seed Started');

      // Connect to database
      await this.createConnection();

      // Seed reports related data
      await this.seedReportsData();

      // Seed default data
      await this.seedDefaultData();

      // Seed random data
      await this.seedRandomData();

      // Seed jobs related data
      await this.seedJobsData();

      // Disconnect to database
      await this.closeConnection();

      console.log('Database Demo Seed Completed');
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Populate database with report related data
   */
  private async seedReportsData() {
    try {
      this.log(
        chalk.green(
          `🌱 SEEDING ${
            env.production ? 'PRODUCTION' : ''
          } REPORTS DATABASE...`,
        ),
      );

      this.log(
        chalk.green(
          `✅ SEEDED ${env.production ? 'PRODUCTION' : ''} REPORTS DATABASE`,
        ),
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Seed Default Job Data
   */
  public async runJobsSeed() {
    this.seedType = SeederTypeEnum.ALL;
    try {
      // Seed jobs related data
      await this.seedJobsData();

      console.log('Database Jobs Seed Completed');
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Populate database with jobs related data
   */
  private async seedJobsData() {
    try {
      this.log(
        chalk.green(
          `🌱 SEEDING ${env.production ? 'PRODUCTION' : ''} JOBS DATABASE...`,
        ),
      );

      this.log(
        chalk.green(
          `✅ SEEDED ${env.production ? 'PRODUCTION' : ''} JOBS DATABASE`,
        ),
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Populate Database with Basic Default Data
   */
  private async seedBasicDefaultData() {
    this.log(
      chalk.magenta(
        `🌱 SEEDING BASIC ${env.production ? 'PRODUCTION' : ''} DATABASE...`,
      ),
    );

    // Seed data which only needs connection
    await this.tryExecute('Stocks', createStocks(this.dataSource));

    this.log(
      chalk.magenta(
        `✅ SEEDED BASIC ${env.production ? 'PRODUCTION' : ''} DATABASE`,
      ),
    );
  }

  /**
   * Populate default data for default tenant
   */
  private async seedDefaultData() {
    this.log(
      chalk.magenta(
        `🌱 SEEDING DEFAULT ${env.production ? 'PRODUCTION' : ''} DATABASE...`,
      ),
    );

    this.log(
      chalk.magenta(
        `✅ SEEDED DEFAULT ${env.production ? 'PRODUCTION' : ''} DATABASE`,
      ),
    );
  }

  /**
   * Populate database with random generated data
   */
  private async seedRandomData() {
    this.log(
      chalk.magenta(
        `🌱 SEEDING RANDOM ${env.production ? 'PRODUCTION' : ''} DATABASE...`,
      ),
    );
    this.log(
      chalk.magenta(
        `✅ SEEDED RANDOM ${env.production ? 'PRODUCTION' : ''} DATABASE`,
      ),
    );
  }

  /**
   * Cleans all the previous generate screenshots, reports etc
   */
  private async cleanUpPreviousRuns() {
    this.log(chalk.green(`CLEANING UP FROM PREVIOUS RUNS...`));

    await new Promise((resolve) => {
      const assetOptions = this.configService.assetOptions;
      const dir = path.join(assetOptions.assetPublicPath, 'screenshots');

      // delete old generated screenshots
      rimraf(`${dir}/!(rimraf|.gitkeep)`, () => {
        this.log(chalk.green(`✅ CLEANED UP`));
        resolve(true);
      });
    });
  }

  /**
   * Create connection from database
   */
  private async createConnection() {
    if (!this.dataSource) {
      this.log(
        'NOTE: DATABASE CONNECTION DOES NOT EXIST YET. NEW ONE WILL BE CREATED!',
      );
    }
    const { dbConnectionOptions } = this.configService;
    if (!this.dataSource || !this.dataSource.isInitialized) {
      try {
        this.log(chalk.green(`CONNECTING TO DATABASE...`));
        const options = {
          ...dbConnectionOptions,
          ...this.overrideDbConfig,
        };
        const dataSource = new DataSource({
          ...options,
        } as DataSourceOptions);

        if (!dataSource.isInitialized) {
          this.dataSource = await dataSource.initialize();
          this.log(chalk.green(`✅ CONNECTED TO DATABASE!`));
        }
      } catch (error) {
        this.handleError(error, 'Unable to connect to database');
      }
    }
  }

  /**
   * Close connection from database
   */
  private async closeConnection() {
    try {
      if (this.dataSource && this.dataSource.isInitialized) {
        await this.dataSource.destroy();
        this.log(chalk.green(`✅ DISCONNECTED TO DATABASE!`));
      }
    } catch (error) {
      this.log(
        'NOTE: DATABASE CONNECTION DOES NOT EXIST YET. CANT CLOSE CONNECTION!',
      );
    }
  }

  /**
   * Reset the database, truncate all tables (remove all data)
   */
  private async resetDatabase() {
    this.log(chalk.green(`RESETTING DATABASE...`));

    const entities = await this.getEntities();
    await this.cleanAll(entities);

    this.log(chalk.green(`✅ RESET DATABASE SUCCESSFUL`));
  }

  /**
   * Retrieve entities metadata
   */
  private async getEntities() {
    const entities = [];
    try {
      this.dataSource.entityMetadatas.forEach((entity) =>
        entities.push({
          name: entity.name,
          tableName: entity.tableName,
        }),
      );
      return entities;
    } catch (error) {
      this.handleError(error, 'Unable to retrieve database metadata');
    }
  }

  /**
   * Cleans all the entities
   * Removes all data from database
   */
  private async cleanAll(entities: Array<any>) {
    try {
      const manager = this.dataSource.manager;
      const database = this.configService.dbConnectionOptions;

      switch (database.type) {
        case 'postgres':
          const tables = entities.map((entity) => '"' + entity.tableName + '"');
          const truncateSql = `TRUNCATE TABLE ${tables.join(
            ',',
          )} RESTART IDENTITY CASCADE;`;
          await manager.query(truncateSql);
          break;
        default:
          await manager.query(`PRAGMA foreign_keys = OFF;`);
          for (const entity of entities) {
            await manager.query(`DELETE FROM "${entity.tableName}";`);
          }
      }
    } catch (error) {
      this.handleError(error, 'Unable to clean database');
    }
  }

  /**
   * Use this wrapper function for all seed functions which are not essential.
   * Essentials seeds are ONLY those which are required to start the UI/login
   */
  public tryExecute<T>(
    name: string,
    p: Promise<T>,
  ): Promise<T> | Promise<void> {
    this.log(
      chalk.green(`${moment().format('DD.MM.YYYY HH:mm:ss')} SEEDING ${name}`),
    );

    return (p as any).then(
      (x: T) => x,
      (error: Error) => {
        this.log(chalk.bgRed(`🛑 ERROR: ${error ? error.message : 'unknown'}`));
      },
    );
  }

  private handleError(error: Error, message?: string): void {
    this.log(
      chalk.bgRed(
        `🛑 ERROR: ${message ? message + '-> ' : ''} ${
          error ? error.message : ''
        }`,
      ),
    );
    throw error;
  }
}
