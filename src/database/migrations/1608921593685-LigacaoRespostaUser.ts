import {MigrationInterface, QueryRunner} from "typeorm";

export class LigacaoRespostaUser1608921593685 implements MigrationInterface {
    name = 'LigacaoRespostaUser1608921593685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `respostas` ADD `userId` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `respostas` ADD CONSTRAINT `FK_09e0366b6dec322b720ff8dc6da` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `respostas` DROP FOREIGN KEY `FK_09e0366b6dec322b720ff8dc6da`");
        await queryRunner.query("ALTER TABLE `respostas` DROP COLUMN `userId`");
    }

}
