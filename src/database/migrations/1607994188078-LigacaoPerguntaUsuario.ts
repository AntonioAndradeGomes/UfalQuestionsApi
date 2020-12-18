import {MigrationInterface, QueryRunner} from "typeorm";

export class LigacaoPerguntaUsuario1607994188078 implements MigrationInterface {
    name = 'LigacaoPerguntaUsuario1607994188078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `perguntas` ADD `userId` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `perguntas` ADD CONSTRAINT `FK_6ab43ce453c9bf0e427b45a23f8` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `perguntas` DROP FOREIGN KEY `FK_6ab43ce453c9bf0e427b45a23f8`");
        await queryRunner.query("ALTER TABLE `perguntas` DROP COLUMN `userId`");
    }

}
