import {ParcelFashionCSVReader} from './parcel-fashion';
import {
	trackingFixture,
	trackingCheckPointFixture
} from '../../../test/fixtures';
import {expect} from 'chai';
import {ITracking, ITrackingCheckpoint} from '../../types/models';

describe('ParcelFashionCSVReader', () => {
	const reader = new ParcelFashionCSVReader();

	describe('readCSV', () => {
		it('gets the buffer content and transform it into tracking details', async () => {
			const [data] = await reader.readCSV({
				checkpointsContent: trackingCheckPointFixture,
				trackingContent: trackingFixture,
			});

			expect(data.tracking).to.deep.contains(<ITracking>{
				courier: 'DHL',
				tracking_number: '00340000161200000001',
				external_id: 'ORD-123-2018',
				destination: {
					city: 'München',
					country_iso: 'DEU',
					street: 'Landwehrstr. 39',
					zip_code: '80336',
				},
				articles: [{
					external_id: 'A-B2-U',
					quantity:1,
					name: 'parcelLab Tote Bag',
					image_url: 'http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg'
				}],
				receiver_email: 'julian@parcellab.com'
			});

			expect(data.checkpoints[0]).to.deep.contains(<ITrackingCheckpoint>{
				timestamp: '2018-04-01T00:00:00.000Z',
				location: '',
				tracking_number: '00340000161200000001',
				status: 'OrderProcessed',
			})
		})
	})
})
