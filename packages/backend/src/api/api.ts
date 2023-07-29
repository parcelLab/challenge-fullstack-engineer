import {IAPIConfig} from '../types/config';
import {MemoryTrackingRepository} from '../repositories/memory/tracking';

import express from 'express';
import {createTrackingRoute} from './routes/tracking';
export class Api {
	constructor(private readonly config: IAPIConfig) {
	}

	start(): void {
		const repository = new MemoryTrackingRepository();
		const expressApp = express()

		expressApp.use(createTrackingRoute(repository));

		expressApp.listen(this.config.http.port, '127.0.0.1', () => {
			console.log('Listing in port', this.config.http.port);
		})
	}
}
