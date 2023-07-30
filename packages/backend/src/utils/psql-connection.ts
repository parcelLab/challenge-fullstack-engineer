import {IAPIConfig} from '../types/config';
import knex, {Knex} from 'knex';

export function createKnexPgConnection(config: IAPIConfig['psql']): Knex {
	return knex({
		client: 'pg',
		connection: {
			port: config.port,
			user: config.user,
			password: config.password,
			database: config.database,
			pool: {min: 1, max: config.maxConnections }
		}
	})
}
