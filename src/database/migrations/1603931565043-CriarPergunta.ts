import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CriarPergunta1603931565043 implements MigrationInterface {
  //instrução que vai criar a tabela Pergunta
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "perguntas",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "titulo",
            type: "text",
            isNullable: false,
          },
          {
            name: "descricao",
            type: "longtext",
            isNullable: false,
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
        ],
      })
    );
  }

  //instrução que vai remover a pergunta do banco de dados
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("perguntas");
  }
}
