import {IAPIConfig} from '../types/config';
import {Api} from '../api/api';

export function startAPI(): void {
	// TODO read config from ENV
	const config: IAPIConfig = {
		http: {port: 8000},
	}

	const api = new Api(config);

	api.start();
}

startAPI();
