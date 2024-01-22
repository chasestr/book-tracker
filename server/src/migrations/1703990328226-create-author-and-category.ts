import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthorAndCategory1703990328226 implements MigrationInterface {
    name = 'CreateAuthorAndCategory1703990328226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_categories" ("bookId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_e7691de8dd8f54b0404e9704eda" PRIMARY KEY ("bookId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11a8804bb7f4ae35b4a5a118b1" ON "book_categories" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78ea9e36c585bb76b40173cd3d" ON "book_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE TABLE "book_authors " ("bookId" integer NOT NULL, "authorsId" integer NOT NULL, CONSTRAINT "PK_7531b2cc9bff78b84652375541c" PRIMARY KEY ("bookId", "authorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_572849de25122a0500a5007e39" ON "book_authors " ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f3479024a2e8a5a50374a4811f" ON "book_authors " ("authorsId") `);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "summary"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "imgSrc" character varying NOT NULL DEFAULT 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'`);
        await queryRunner.query(`ALTER TABLE "book" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "book" ADD "publishDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "book_categories" ADD CONSTRAINT "FK_11a8804bb7f4ae35b4a5a118b1b" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_categories" ADD CONSTRAINT "FK_78ea9e36c585bb76b40173cd3d0" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_authors " ADD CONSTRAINT "FK_572849de25122a0500a5007e39e" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_authors " ADD CONSTRAINT "FK_f3479024a2e8a5a50374a4811f7" FOREIGN KEY ("authorsId") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_authors " DROP CONSTRAINT "FK_f3479024a2e8a5a50374a4811f7"`);
        await queryRunner.query(`ALTER TABLE "book_authors " DROP CONSTRAINT "FK_572849de25122a0500a5007e39e"`);
        await queryRunner.query(`ALTER TABLE "book_categories" DROP CONSTRAINT "FK_78ea9e36c585bb76b40173cd3d0"`);
        await queryRunner.query(`ALTER TABLE "book_categories" DROP CONSTRAINT "FK_11a8804bb7f4ae35b4a5a118b1b"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "publishDate"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "imgSrc"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "author" character varying`);
        await queryRunner.query(`ALTER TABLE "book" ADD "notes" character varying`);
        await queryRunner.query(`ALTER TABLE "book" ADD "summary" character varying`);
        await queryRunner.query(`ALTER TABLE "book" ADD "genre" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3479024a2e8a5a50374a4811f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_572849de25122a0500a5007e39"`);
        await queryRunner.query(`DROP TABLE "book_authors "`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78ea9e36c585bb76b40173cd3d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11a8804bb7f4ae35b4a5a118b1"`);
        await queryRunner.query(`DROP TABLE "book_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "authors"`);
    }

}
