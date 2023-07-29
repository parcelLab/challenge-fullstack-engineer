import {ITrackingRepository} from '../../types/components';
import {Router} from 'express';
import {safeJSONResponse} from '../../utils/express';
import {TrackingHandler} from '../handlers/tracking';

export function createTrackingRoute(repository: ITrackingRepository): Router {
	const router = Router();
	const handler = new TrackingHandler(repository);
	// TODO Add jwt authentication with payload email
	router.get('/', safeJSONResponse(async(req) => {
		const email = req.query.email as string;
		return handler.getUserTrackings(email);
	}));

	router.get('/:tracking_id', safeJSONResponse(async(req) => {
		const id = req.params.tracking_id as string;
		return handler.getTrackingById(id);
	}));

	return Router().use('/v1/trackings', router);
}
