import {MigrationInterface, QueryRunner} from "typeorm";

export class LigacaoRespostaPergunta1608920971786 implements MigrationInterface {
    name = 'LigacaoRespostaPergunta1608920971786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `respostas` ADD `perguntaId` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `respostas` ADD CONSTRAINT `FK_4a9fc199001a0f8651433fb9240` FOREIGN KEY (`perguntaId`) REFERENCES `perguntas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `respostas` DROP FOREIGN KEY `FK_4a9fc199001a0f8651433fb9240`");
        await queryRunner.query("ALTER TABLE `respostas` DROP COLUMN `perguntaId`");
    }

}
