export enum ScreenState {
	Loading = "Loading",
	Error = "Error",
	NotAuthorized = "NotAuthorized",
	DataReady = "DataReady",
}

// TODO somehow get this from the BE
export interface Order {
	articleImageUrl: string;
	articleNo: string;
	city: string;
	courier: string;
	customerId: string;
	destination_country_iso3: string;
	email: string;
	id: string;
	order_number: string;
	product_name: string;
	quantity: string;
	street: string;
	tracking_number: string;
	zip_code: string;
}
