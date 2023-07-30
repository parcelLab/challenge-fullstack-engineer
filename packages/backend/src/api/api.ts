import {IAPIConfig} from '../types/config';
import {MemoryTrackingRepository} from '../db/repositories/memory/tracking';

import express from 'express';
import {createTrackingRoute} from './routes/tracking';
import {SQLTRackingRepository} from '../db/repositories/sql/tracking';
import knex from 'knex';
import {createKnexPgConnection} from '../utils/psql-connection';
export class Api {
	constructor(private readonly config: IAPIConfig) {
	}

	start(): void {
		const psqlConnection = createKnexPgConnection(this.config.psql);
		const repository = new SQLTRackingRepository(psqlConnection);
		const expressApp = express()

		expressApp.use(createTrackingRoute(repository));

		expressApp.listen(this.config.http.port, '127.0.0.1', () => {
			console.log('Listing in port', this.config.http.port);
		})
	}
}
