import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDateColumns1701838093890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
        ALTER TABLE "book" ALTER COLUMN "startDate" TYPE DATE 
        using("startDate"::date);
    `);
    await queryRunner.query(/* sql */ `
        ALTER TABLE "book" ALTER COLUMN "finishDate" TYPE DATE 
        using("finishDate"::date);
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
