import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationInicial1607122543740 implements MigrationInterface {
    name = 'MigrationInicial1607122543740'
    //lembrar de remover os ids que são chaves estrangeiras sempre que gerar uma migration
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `nome` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `avatar` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `cursoId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cursos` (`id` varchar(36) NOT NULL, `nome` varchar(255) NOT NULL, `codigo` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `perguntas` (`id` varchar(36) NOT NULL, `titulo` varchar(255) NOT NULL, `descricao` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_7877db0470b024ae5d76e663b05` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_7877db0470b024ae5d76e663b05`");
        await queryRunner.query("DROP TABLE `perguntas`");
        await queryRunner.query("DROP TABLE `cursos`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
