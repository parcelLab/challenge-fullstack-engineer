import {MemoryTrackingRepository} from '../repositories/memory/tracking';
import {CSVImporter} from '../csv-importer/importer';
import {ParcelFashionCSVReader} from '../csv-importer/readers/parcel-fashion';

export async function importCSV() {
	// Todo read variables from CLI
	const trackingPath = 'data/trackings.csv';
	const checkpointsPath = 'data/checkpoints.csv';
	const repository = new MemoryTrackingRepository();

	const importer = new CSVImporter({
		'parcel_fashion': new ParcelFashionCSVReader(),
	}, repository);

	await importer.importCSV({
		fileCheckpointsPath: checkpointsPath,
		importerType: 'parcel_fashion',
		fileTrackingPath: trackingPath,
	})

	console.log('Data imported', JSON.stringify(await repository.getTracking({}), null, 2));
}

void importCSV();
