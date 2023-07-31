import {getTrackingByID, getUserTrackings} from '../services/api';
import {LoaderFunctionArgs} from 'react-router-dom';

export async function loadersUserTrackings(data: {request: {url: string}}) {
	const {request} = data;
	const email = new URL(request.url).searchParams.get('email')!;
	return {
		data: await getUserTrackings(email),
	};
}

export async function loadTrackingById(data: LoaderFunctionArgs) {
	return {
		data: await getTrackingByID(data.params['id'] as string),
	};
}
