export interface IParcelFashionTracking {
	orderNo: number, // - the order number of one of the orders that Julian submitted
	tracking_number: number, // - the courier tracking number that is used to ship the order to the recipient
	courier: string, // - the name of the courier that fulfils the shipment
	street: string, // - the street and house number of the recipient
	zip_code: string, // - the ZIP / postal code of the recipient
	city: string, // - the city of the recipient
	destination_country_iso3: string, // Improvement use ENUM // - the ISO3 country code of the recipient
	email: number, // - the email address of the recipient
	articleNo: number, // - the online shop's article number of the article that is being shipped to the recipient
	articleImageUrl: string, // - a picture URL of the article
	quantity: number, // - the quantity of the article
	product_name: string, // - the name of the article
}

export interface IParcelFashionCheckpoint {
	tracking_number: number,// - the courier tracking number that identifies a single shipment
	location: string,// - a place name that specifies where the checkpoint occurred
	timestamp: string,// - a UTC timestamp that specifies when the checkpoint occurred
	status: string, // TODO: Use enum // - a short code that describes the checkpoint's status
	status_text: string,// - a more human readable version of the status short code
	status_detail: string,// - a more human readable detailed version of the checkpoint's status
}
