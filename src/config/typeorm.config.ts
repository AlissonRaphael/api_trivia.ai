import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 4321,
  username: 'postgres',
  password: '12345',
  database: 'trivia_dev',
  synchronize: false,
  logging: true,
  subscribers: [],
  migrations: ['../shared/infra/typeorm/migrations/*.ts'],
  entities: ['../modules/player/*{.ts|.js}'],
};
