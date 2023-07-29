import {
	ITrackingFilterOptions,
	ITrackingRepository
} from '../../types/components';
import {IGroupedTracking} from '../../types/models';

export class TrackingRepository implements ITrackingRepository {

	private readonly data: Record<string, IGroupedTracking> = {}

	getTracking(filters: ITrackingFilterOptions): Promise<IGroupedTracking[]> {
		let filteredData = this.data;

		if (filters.id) {
			filteredData = filters.id.reduce((res, id) => {
				if (this.data[id]) res[id] = this.data[id];
				return res;
			}, {} as Record<string, IGroupedTracking>)
		}

		if (filters.email) {
			filteredData = filters.email.reduce((res, email) => {
				const groupedTracking = Object.values(filteredData).find(t => t.tracking.receiver_email === email);
				if (groupedTracking) {
					res[groupedTracking.tracking.id] = groupedTracking;
				}
				return res;
			}, {} as Record<string, IGroupedTracking>)
		}

		return Promise.resolve(Object.values(filteredData));
	}

	save(trackings: IGroupedTracking[]): Promise<IGroupedTracking[]> {
		trackings.forEach(t => this.data[t.tracking.id] = t);
		return Promise.resolve(trackings);
	}
}
