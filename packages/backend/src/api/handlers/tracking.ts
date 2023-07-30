import {ITrackingRepository} from '../../types/components';
import {IGroupedTracking} from '../../types/models';
import {TrackingNotFoundException} from '../../exceptions/exceptions';
import {logger} from '../../utils/logger';

export class TrackingHandler {
	constructor(private readonly repository: ITrackingRepository) {
	}

	getUserTrackings(userEmail: string): Promise<IGroupedTracking[]> {
		logger.debug('Finding tracking by email', { userEmail });
		return this.repository.getTracking({ email: [userEmail]});
	}

	async getTrackingById(id: string): Promise<IGroupedTracking | undefined> {
		logger.debug('Finding tracking by id', { id });
		const [tracking] = await this.repository.getTracking({id: [id]});
		if (!tracking) {
			throw new TrackingNotFoundException(id);
		}
		return tracking;
	}
}
