import { Link } from "react-router-dom";
import { OrderItem, OrderWithOrderItems } from "../apiTypes";
import { OrderEntry } from "./OrderEntry";

interface OrderItemProps {
	orderItems: OrderItem[];
}

const OrderItems = ({ orderItems }: OrderItemProps) => (
	<div className="pt-2 border-t-2">
		<h4 className="font-bold mb-2 text-lg">Articles</h4>
		<ul>
			{orderItems.map(({ quantity, article }) => (
				<li
					key={article.product_name}
					className="mb-2 flex items-center"
				>
					<img
						className="w-8 mr-4"
						src={article.articleImageUrl}
						alt={article.product_name}
					/>
					<span className="bg-green-600 text-white px-2 mr-4 rounded-xl">
						{quantity}
					</span>
					<span className="font-bold">{article.product_name}</span>
				</li>
			))}
		</ul>
	</div>
);

interface Props {
	order: OrderWithOrderItems;
}

export const OrderPreview = ({
	order: { order_number, courier, orderItems, street, zip_code, city },
}: Props) => (
	<Link to={`/order/${order_number}`}>
		<div className="bg-white border-2 border-black mb-3 p-4 rounded-2xl hover:bg-slate-100">
			<ul className="grid gap-4 grid-cols-2 mb-2">
				<OrderEntry label="Order Number" value={order_number} />
				<OrderEntry label="Courier" value={courier} />
				<OrderEntry
					label="Delivery Address"
					value={`${street}\n${zip_code} ${city}`}
				/>
			</ul>
			{orderItems.length && orderItems[0].quantity ? (
				<OrderItems orderItems={orderItems} />
			) : null}
		</div>
	</Link>
);
