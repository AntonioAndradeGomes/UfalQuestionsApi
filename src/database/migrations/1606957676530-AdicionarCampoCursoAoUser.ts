import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AdicionarCampoCursoAoUser1606957676530
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "curso_id",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        name: "UserCurso",
        columnNames: ["curso_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cursos",
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "UserCurso");
    await queryRunner.dropColumn("users", "curso_id");
  }
}
