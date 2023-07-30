import { IAPIConfig } from '../types/config';
import { Api } from '../api/api';

export function startAPI(): void {
  // TODO read config from ENV
  const config: IAPIConfig = {
    http: { port: 8000 },
    psql: {
      user: 'root',
      password: 'changeme',
      port: 5432,
      database: 'parcel_lab_dev',
    },
  };

  // TODO use abstract factory to create repositories

  const api = new Api(config);

  api.start();
}

startAPI();
