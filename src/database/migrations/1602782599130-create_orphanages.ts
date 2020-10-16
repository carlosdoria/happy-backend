import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602782599130 implements MigrationInterface {

  // Realiza alterações no bd - criar tabelas, campos, deletar
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
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
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10, // casas decimais a direita da vírgula
          precision: 2, //casas decimais a esquerda da vírgula
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: "opening_hours",
          type: "varchar"
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        },
      ],
    }))
  }

  // Desfaz o que foi feito
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }

}
