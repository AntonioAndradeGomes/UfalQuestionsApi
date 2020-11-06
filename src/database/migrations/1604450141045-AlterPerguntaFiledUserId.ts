import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AlterPerguntaFiledUserId1604450141045
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "perguntas",
      new TableColumn({
        name: "user_id",
        type: "varchar",
      })
    );

    await queryRunner.createForeignKey(
      "perguntas",
      new TableForeignKey({
        name: "PerguntasUser",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //desfazer o que foi feito acima na ordem inversa
    await queryRunner.dropForeignKey("perguntas", "PerguntasUser");
    await queryRunner.dropColumn("perguntas", "user_id");
  }
}
