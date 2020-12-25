import {MigrationInterface, QueryRunner} from "typeorm";

export class CriandoRespostas1608598474454 implements MigrationInterface {
    name = 'CriandoRespostas1608598474454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `respostas` (`id` varchar(36) NOT NULL, `textoResposta` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `respostas`");
    }

}
