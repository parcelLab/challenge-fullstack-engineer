export const trackingFixture: Buffer = Buffer.from("orderNo;tracking_number;courier;street;zip_code;city;destination_country_iso3;email;articleNo;articleImageUrl;quantity;product_name\n" +
	"ORD-123-2018;00340000161200000001;DHL;Landwehrstr. 39;80336;München;DEU;julian@parcellab.com;A-B2-U;http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg;1;parcelLab Tote Bag\n");


export const trackingCheckPointFixture: Buffer = Buffer.from("tracking_number;location;timestamp;status;status_text;status_details\n" +
	"00340000161200000001;;2018-04-01T00:00:00.000Z;OrderProcessed;Order processed;The order has been processed.\n")
