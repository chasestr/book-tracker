import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReadingLogs1702344898541 implements MigrationInterface {
    name = 'CreateReadingLogs1702344898541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reading_log" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "bookId" integer NOT NULL, "userId" integer NOT NULL, "pagesRead" integer, "minutes" integer, CONSTRAINT "PK_d54aa951bc4a8a3de71e9682d34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."book_status_enum" AS ENUM('Not_Started', 'In_Progress', 'Finished')`);
        await queryRunner.query(`ALTER TABLE "book" ADD "status" "public"."book_status_enum" NOT NULL DEFAULT 'Not_Started'`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "startDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "finishDate"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "finishDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "reading_log" ADD CONSTRAINT "FK_ff5990c7823f206f50edc62d471" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reading_log" ADD CONSTRAINT "FK_ccde85beafa332f97d9250ebe78" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reading_log" DROP CONSTRAINT "FK_ccde85beafa332f97d9250ebe78"`);
        await queryRunner.query(`ALTER TABLE "reading_log" DROP CONSTRAINT "FK_ff5990c7823f206f50edc62d471"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "finishDate"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "finishDate" date`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "startDate" date`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."book_status_enum"`);
        await queryRunner.query(`DROP TABLE "reading_log"`);
    }

}
