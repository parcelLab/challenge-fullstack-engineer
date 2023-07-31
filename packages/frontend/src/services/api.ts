// TODO This should be imported as a dependency or as monorepo
export interface IArticle {
	external_id: string;
	image_url: string;
	quantity: number;
	name: string;
}

export interface ITrackingDestination {
	street: string;
	zip_code: string;
	city: string;
	country_iso: string;
}

export interface ITracking {
	id: string;
	external_id: string;
	tracking_number: string;
	courier: string;
	destination: ITrackingDestination;
	receiver_email: string;
	articles: IArticle[];
}

export interface ITrackingCheckpoint {
	id: string;
	tracking_internal_id: string;
	tracking_number: string;
	location: string;
	timestamp: string;
	status: string;
	status_text: string;
	status_detail: string;
}

export interface IGroupedTracking {
	tracking: ITracking;
	checkpoints: ITrackingCheckpoint[];
}


export async function getUserTrackings(email: string): Promise<IGroupedTracking[]> {
	const url = new URL('http://localhost:8000/v1/trackings');
	url.searchParams.append('email', email);
	const request = await fetch(url);
	if (!request.ok) throw new Error(`Error on requesting user trackings ${await request.text()}`);

	return request.json();
}

export async function getTrackingByID(id: string): Promise<IGroupedTracking> {
	const request = await fetch(`http://localhost:8000/v1/trackings/${id}`);
	if (!request.ok) throw new Error(`Error on requesting  trackings ${await request.text()}`);

	return request.json();
}
