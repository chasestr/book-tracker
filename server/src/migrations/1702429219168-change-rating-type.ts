import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRatingType1702429219168 implements MigrationInterface {
    name = 'ChangeRatingType1702429219168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "rating" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "rating" integer`);
    }

}
