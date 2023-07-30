export interface IAPIConfig {
  http: {
    port: number;
  };
  psql: {
    database: string;
    port: number;
    user: string;
    password: string;
    maxConnections?: number;
  };
}
