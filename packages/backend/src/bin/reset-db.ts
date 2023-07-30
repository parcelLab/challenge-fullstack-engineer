import * as fs from 'fs';
import {createKnexPgConnection} from '../utils/psql-connection';
import knex from 'knex';

export async function resetDb() {
	const schema = await fs.promises.readFile('src/db/schema.sql');
	// TODO get from ENV or config file
	const connection =  createKnexPgConnection({
		user: 'root',
		password: 'changeme',
		port: 5432,
		database: 'parcel_lab_dev'
	});

	console.log('Resetting db');

	await connection.raw(schema.toString(), []);
	console.log('DB finished');

	await connection.destroy();
}

void resetDb()
