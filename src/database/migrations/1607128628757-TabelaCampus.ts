import {MigrationInterface, QueryRunner} from "typeorm";

export class TabelaCampus1607128628757 implements MigrationInterface {
    name = 'TabelaCampus1607128628757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `campus` (`id` varchar(36) NOT NULL, `nome` varchar(255) NOT NULL, `localidade` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `cursos` ADD `campusId` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `cursos` ADD CONSTRAINT `FK_e05d2ae8ae9058050dd03c32b31` FOREIGN KEY (`campusId`) REFERENCES `campus`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cursos` DROP FOREIGN KEY `FK_e05d2ae8ae9058050dd03c32b31`");
        await queryRunner.query("ALTER TABLE `cursos` DROP COLUMN `campusId`");
        await queryRunner.query("DROP TABLE `campus`");
    }

}
