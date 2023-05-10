import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1683624546530 implements MigrationInterface {
  name = 'Migrations1683624546530';

  /**
   * Up Migration
   *
   * @param queryRunner
   */
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (queryRunner.connection.options.type === 'sqlite') {
      await this.sqliteUpQueryRunner(queryRunner);
    } else {
      await this.postgresUpQueryRunner(queryRunner);
    }
  }

  /**
   * Down Migration
   *
   * @param queryRunner
   */
  public async down(queryRunner: QueryRunner): Promise<any> {
    if (queryRunner.connection.options.type === 'sqlite') {
      await this.sqliteDownQueryRunner(queryRunner);
    } else {
      await this.postgresDownQueryRunner(queryRunner);
    }
  }

  /**
   * PostgresDB Up Migration
   *
   * @param queryRunner
   */
  public async postgresUpQueryRunner(queryRunner: QueryRunner): Promise<any> {}

  /**
   * PostgresDB Down Migration
   *
   * @param queryRunner
   */
  public async postgresDownQueryRunner(
    queryRunner: QueryRunner,
  ): Promise<any> {}

  /**
   * SqliteDB Up Migration
   *
   * @param queryRunner
   */
  public async sqliteUpQueryRunner(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" varchar PRIMARY KEY NOT NULL, "timestamp" integer NOT NULL, "highestPriceOfTheDay" integer NOT NULL, "lowestPriceOfTheDay" integer NOT NULL, "company" varchar NOT NULL)`,
    );
  }

  /**
   * SqliteDB Down Migration
   *
   * @param queryRunner
   */
  public async sqliteDownQueryRunner(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "stock"`);
  }
}
