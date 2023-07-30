import {MemoryTrackingRepository} from '../db/repositories/memory/tracking';
import {CSVImporter} from '../csv-importer/importer';
import {ParcelFashionCSVReader} from '../csv-importer/readers/parcel-fashion';
import {SQLTRackingRepository} from '../db/repositories/sql/tracking';
import {IAPIConfig} from '../types/config';
import {createKnexPgConnection} from '../utils/psql-connection';
import {logger} from '../utils/logger';

export async function importCSV() {
	// Todo read variables from CLI
	const trackingPath = 'data/trackings.csv';
	const checkpointsPath = 'data/checkpoints.csv';
	const psqlConfig: IAPIConfig['psql'] = {
		user: 'root',
		password: 'changeme',
		port: 5432,
		database: 'parcel_lab_dev'
	};

	const connection =  createKnexPgConnection(psqlConfig);
	const repository = new SQLTRackingRepository(connection);

	const importer = new CSVImporter({
		'parcel_fashion': new ParcelFashionCSVReader(),
	}, repository);

	await importer.importCSV({
		fileCheckpointsPath: checkpointsPath,
		importerType: 'parcel_fashion',
		fileTrackingPath: trackingPath,
	})

	logger.info('Data imported', { data: await repository.getTracking({})});
	await connection.destroy();
}

void importCSV();
