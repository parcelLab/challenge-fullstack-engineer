import {Knex} from 'knex';
import {SuperTest, Test} from 'supertest';
import {createTestRoute, executeWithTransaction, initializeDb} from '../helper';
import {createTrackingRoute} from '../../src/api/routes/tracking';
import {SQLTRackingRepository} from '../../src/db/repositories/sql/tracking';
import {checkpointFixture, trackingFixture} from '../fixtures';
import {expect} from 'chai';
import {IGroupedTracking} from '../../src/types/models';

describe("/v1/trackings", () => {
	let db: Knex;
	let httpClient: SuperTest<Test>;
	let repository: SQLTRackingRepository;

	before(async() => {
		db = await initializeDb('e2e_trackings');
		repository = new SQLTRackingRepository(db);
		httpClient = createTestRoute(createTrackingRoute(repository))
	});

	after(async() => db.destroy());

	describe('GET /', () => {
		it('gets the with the email', async() => {
			await executeWithTransaction(db, async(client: Knex.Transaction) => {
				await client('trackings').insert(trackingFixture);
				await client('tracking_checkpoints').insert(checkpointFixture);

				const res = await httpClient.get('/v1/trackings').query({
					email: trackingFixture.receiver_email,
				})

				expect(res.status).to.equal(200);
				const body = res.body as IGroupedTracking[];
				expect(body.length).to.equal(1);
				expect(body[0].tracking).to.deep.equal(trackingFixture);
				expect(body[0].checkpoints).to.deep.equal([checkpointFixture]);
			})
		});
	});

	describe('GET /:id', () => {
		it('gets the with the id', async() => {
			await executeWithTransaction(db, async(client: Knex.Transaction) => {
				await client('trackings').insert(trackingFixture);
				await client('tracking_checkpoints').insert(checkpointFixture);

				const res = await httpClient.get(`/v1/trackings/${trackingFixture.id}`).query({
					email: trackingFixture.receiver_email,
				})

				expect(res.status).to.equal(200);
				const body = res.body as IGroupedTracking;
				expect(body.tracking).to.deep.equal(trackingFixture);
				expect(body.checkpoints).to.deep.equal([checkpointFixture]);
			})
		});
	})
})
