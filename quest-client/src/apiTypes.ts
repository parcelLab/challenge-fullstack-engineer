// TODO somehow get this from the BE repo to keep this DRY
export interface Order {
	id: string;
	tracking_number: string;
	order_number: string;
	courier: string;
	street: string;
	zip_code: string;
	city: string;
	destination_country_iso3: string;
	email: string;
	customerId: string;
	checkpoints: Checkpoint[];
	orderItems: OrderItem[];
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
	orderItems: OrderItem[];
	checkpoints: Checkpoint[];
}

export interface Article {
	articleNumber: string;
	articleImageUrl: string;
	quantity: number;
	product_name: string;
}

export interface OrderItem {
	quantity: number;
	article: Article;
}

export interface OrderWithOrderItems
	extends Omit<
		Order,
		"articleNo" & "articleImageUrl" & "quantity" & "product_name"
	> {
	orderItems: OrderItem[];
}
