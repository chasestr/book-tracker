import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReadingLogs21702360955238 implements MigrationInterface {
    name = 'CreateReadingLogs21702360955238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reading_log" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "reading_log" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reading_log" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "reading_log" ADD "date" date NOT NULL`);
    }

}
