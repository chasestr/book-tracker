import { Migration } from '@mikro-orm/migrations';

export class Migration20230819032135 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "author" text not null, "publisher" text null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "book" cascade;');
  }

}
