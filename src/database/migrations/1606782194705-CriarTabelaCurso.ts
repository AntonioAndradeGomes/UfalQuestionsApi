import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CriarTabelaCurso1606782194705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "cursos",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            {
              name: "nome",
              type: "varchar",
              isNullable: false
            },
            {
              name: 'codigo',
              type: "varchar",
              isNullable: false
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "now()",
            },
          ]
        })
      );
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('cursos');
    }

}
