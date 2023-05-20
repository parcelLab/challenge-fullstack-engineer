import { Order } from "../types";
import { Link } from "react-router-dom";

interface OrderEntryProps {
	label: string;
	value: string;
}
const OrderEntry = ({ label, value }: OrderEntryProps) => (
	<li>
		<h6>{label}</h6>
		<strong>{value}</strong>
	</li>
);

interface Props {
	order: Order;
}

export const OrderPreview = ({
	order: { order_number, courier, product_name, street, zip_code, city },
}: Props) => (
	<Link to={`/order/${order_number}`}>
		<div className="bg-white border-2 border-black mb-3 p-4 rounded-2xl hover:bg-slate-100">
			<ul className="grid gap-4 grid-cols-2">
				<OrderEntry label="Order Number" value={order_number} />
				<OrderEntry label="Courier" value={courier} />
				<OrderEntry label="Product" value={product_name} />
				<OrderEntry
					label="Delivery Address"
					value={`${street}\n${zip_code} ${city}`}
				/>
			</ul>
		</div>
	</Link>
);
