import { TrackingHandler } from './tracking';
import { mockTrackingRepository } from '../../../test/mocks';
import { reset } from 'sinon';
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { TrackingNotFoundException } from '../../exceptions/exceptions';
import { groupedFixture } from '../../../test/fixtures';
import chaiAsPromised = require('chai-as-promised');

describe('TrackingHandler', () => {
  use(chaiAsPromised);
  use(sinonChai);
  const repository = mockTrackingRepository();
  const handler = new TrackingHandler(repository);

  beforeEach(() => reset());

  describe('getTrackingById', () => {
    it('finds the tracking by id', async () => {
      repository.getTracking.resolves([groupedFixture]);
      expect(await handler.getTrackingById(groupedFixture.tracking.id)).to.deep.equal(groupedFixture);
    });

    context('with a not found tracking', () => {
      it('throws an exception', async () => {
        repository.getTracking.resolves([]);
        await expect(handler.getTrackingById('id')).to.be.rejectedWith(TrackingNotFoundException);
      });
    });
  });
});
