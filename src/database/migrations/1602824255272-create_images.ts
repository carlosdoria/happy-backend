import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602824255272 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true, // informa que o valor deve ser sempre positivo
          isPrimary: true, // informa que é a primary key
          isGenerated: true, // gerada altomaticamente
          generationStrategy: 'increment',
        },
        {
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'ophanage_id',
          type: 'integer',
        }
      ],
      foreignKeys: [
        {
          name: 'ImageOrphanage',
          columnNames: ['ophanage_id'],
          referencedTableName: 'ophanages',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images')
  }

}
