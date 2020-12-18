import {MigrationInterface, QueryRunner} from "typeorm";

export class ALteracoesPergunata1607127688467 implements MigrationInterface {
    name = 'ALteracoesPergunata1607127688467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `perguntas` DROP COLUMN `titulo`");
        await queryRunner.query("ALTER TABLE `perguntas` ADD `titulo` text NOT NULL");
        await queryRunner.query("ALTER TABLE `perguntas` DROP COLUMN `descricao`");
        await queryRunner.query("ALTER TABLE `perguntas` ADD `descricao` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `perguntas` DROP COLUMN `descricao`");
        await queryRunner.query("ALTER TABLE `perguntas` ADD `descricao` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `perguntas` DROP COLUMN `titulo`");
        await queryRunner.query("ALTER TABLE `perguntas` ADD `titulo` varchar(255) NOT NULL");
    }

}
