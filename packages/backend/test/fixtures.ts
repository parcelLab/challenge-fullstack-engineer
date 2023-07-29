import {
	IGroupedTracking,
	ITracking,
	ITrackingCheckpoint
} from '../src/types/models';

export const csvTrackingFixture: Buffer = Buffer.from("orderNo;tracking_number;courier;street;zip_code;city;destination_country_iso3;email;articleNo;articleImageUrl;quantity;product_name\n" +
	"ORD-123-2018;00340000161200000001;DHL;Landwehrstr. 39;80336;München;DEU;julian@parcellab.com;A-B2-U;http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg;1;parcelLab Tote Bag\n");


export const csvTrackingCheckPointFixture: Buffer = Buffer.from("tracking_number;location;timestamp;status;status_text;status_details\n" +
	"00340000161200000001;;2018-04-01T00:00:00.000Z;OrderProcessed;Order processed;The order has been processed.\n")

export const trackingFixture: ITracking = {
	"courier": "DHL",
	"tracking_number": "00340000161200000001",
	"external_id": "ORD-123-2018",
	"destination": {
		"city": "München",
		"country_iso": "DEU",
		"street": "Landwehrstr. 39",
		"zip_code": "80336"
	},
	"id": "357e551c-9648-4aaf-81a6-4792b154f82a",
	"receiver_email": "julian@parcellab.com",
	"articles": [
		{
			"external_id": "A-B2-U",
			"image_url": "http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg",
			"name": "parcelLab Tote Bag",
			"quantity": 1
		},
		{
			"external_id": "A-C1-L",
			"image_url": "http://cdn.parcellab.com/img/sales-cannon/parcellab-cap.jpg",
			"name": "parcelLab Branded Cap",
			"quantity": 2
		}
	]
};

export const checkpointFixture: ITrackingCheckpoint = {
	"tracking_internal_id": "357e551c-9648-4aaf-81a6-4792b154f82a",
	"id": "677b2631-e177-4ff1-aa61-1603386eda0b",
	"location": "",
	"status": "OrderProcessed",
	"status_detail": "The order has been processed.",
	"status_text": "Order processed",
	"tracking_number": "00340000161200000001",
	"timestamp": "2018-04-01T00:00:00.000Z"
}

export const groupedFixture: IGroupedTracking = {
	tracking: trackingFixture,
	checkpoints: [checkpointFixture]
}


