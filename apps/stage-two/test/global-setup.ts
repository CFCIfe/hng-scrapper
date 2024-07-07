import { DataSource } from 'typeorm';
import { Organisation, User } from '../src/model/user.entity';

export default async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'testdb',
    entities: [User, Organisation],
    synchronize: true,
  });

  await dataSource.initialize();
};
