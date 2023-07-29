import {ITrackingRepository} from '../../types/components';
import {IGroupedTracking} from '../../types/models';
import {TrackingNotFoundException} from '../../exceptions/exceptions';

export class TrackingHandler {
	constructor(private readonly repository: ITrackingRepository) {
	}

	getUserTrackings(userEmail: string): Promise<IGroupedTracking[]> {
		return this.repository.getTracking({ email: [userEmail]});
	}

	async getTrackingById(id: string): Promise<IGroupedTracking | undefined> {
		const [tracking] = await this.repository.getTracking({id: [id]});
		if (!tracking) {
			throw new TrackingNotFoundException(id);
		}
		return tracking;
	}
}
