import {ICSVReader, ITrackingRepository} from '../types/components';
import {
	ErrorCode,
	InvalidReaderException,
	ParcelLabException
} from '../exceptions/exceptions';
import * as fs from 'fs';

export class CSVImporter {
	constructor(private readonly csvReaders: Record<string, ICSVReader>, private readonly trackingRepository: ITrackingRepository) {
	}

	async importCSV(params: {
		importerType: 'parcel_fashion' | string,
		fileTrackingPath: string;
		fileCheckpointsPath: string;
	}): Promise<void> {
		const reader = this.csvReaders[params.importerType];
		if (!reader) {
			throw new InvalidReaderException(params.importerType);
		}

		try {
			const data = await reader.readCSV({
				checkpointsContent: await fs.promises.readFile(params.fileCheckpointsPath),
				trackingContent: await fs.promises.readFile(params.fileTrackingPath)
			});

			await this.trackingRepository.save(data);
		} catch (e) {
			throw new ParcelLabException({
				message: `Error importing csv: ${e.message}`,
				code: ErrorCode.unknown,
				component: 'CSVReader',
				details: e.message,
			})
		}
	}
}
