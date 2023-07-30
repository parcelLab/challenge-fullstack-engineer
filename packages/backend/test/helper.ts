import {Knex} from 'knex';
import {createKnexPgConnection} from '../src/utils/psql-connection';
import * as fs from 'fs';
import supertest, {SuperTest, Test} from 'supertest';
import express, {Router} from 'express';

export async function initializeDb(namespace: string): Promise<Knex<any, any[]>> {
	const schema = await fs.promises.readFile('src/db/schema.sql');
	const db = createKnexPgConnection({
		port: process.env.DB_TEST_PORT ? parseInt(process.env.DB_TEST_PORT): 5432,
		database: process.env.DB_TEST_DBNAME ?? 'parcel_lab_dev',
		user: process.env.DB_TEST_USER ?? 'root',
		password: process.env.DB_TEST_PASSWORD ?? 'changeme',
		maxConnections: 1,
		searchPath: [namespace, 'public']
	});

	await db.raw(`
		DROP SCHEMA IF EXISTS ${namespace} CASCADE;
		CREATE SCHEMA ${namespace};
		---
		${schema.toString()}
	`)

	return db;
}

export async function executeWithTransaction(db: Knex, cb: (client: Knex.Transaction) => Promise<void>): Promise<void> {
	const client = await db.transaction();
	try{
		await cb(client);
	} finally {
		await client.rollback();
	}
}

export function createTestRoute(router: Router): SuperTest<Test> {
	const app = express();
	app.use(router);
	return supertest(app);
}
