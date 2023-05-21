// TODO somehow get this from the BE repo to keep this DRY
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
export interface Checkpoint {
	id: number;
	location: string;
	timestamp: string;
	status: string;
	status_text: string;
	status_details: string;
	tracking_number: string;
}
export interface OrderDetails {
	order: OrderWithArticles;
	checkpoints: Checkpoint[];
}

export interface OrderArticle {
	articleNumber: string;
	articleImageUrl: string;
	quantity: number;
	product_name: string;
}

export interface OrderWithArticles
	extends Omit<
		Order,
		"articleNo" & "articleImageUrl" & "quantity" & "product_name"
	> {
	articles: OrderArticle[];
}
