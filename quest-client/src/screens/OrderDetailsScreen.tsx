import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { useApi } from "../hooks/useApi";
import { ScreenState } from "../types";
import { CheckpointTimeline } from "../components/CheckpointTimeline";
import { OrderEntry } from "../components/OrderEntry";
import { Order, OrderDetails } from "../apiTypes";
import { useAuthorizedRoute } from "../hooks/useAuthorizedRoute";

export const OrderDetailsScreen = () => {
	const { kickout } = useAuthorizedRoute();

	const { orderNumber } = useParams();
	const [screenState, setScreenState] = useState<ScreenState>(
		ScreenState.Loading
	);

	const [error, setError] = useState<string>();

	const [orderDetails, setOrderDetails] = useState<Order>();

	const { getOrderDetails } = useApi();

	useEffect(() => {
		if (!orderNumber || orderDetails) return;

		async function fetchAndSetOrders() {
			const response = await getOrderDetails(orderNumber as string);

			if (response.data) {
				setOrderDetails(response.data);
				setScreenState(ScreenState.DataReady);
			}

			if (response.error?.code === "ERR_BAD_REQUEST") kickout();

			if (response.error) {
				setError(response.error.message);
				setScreenState(ScreenState.Error);
			}
		}
		fetchAndSetOrders();
	}, [getOrderDetails, kickout, orderDetails, orderNumber]);

	if (screenState === ScreenState.Loading) {
		return <p className="text-3xl">Loading, please wait</p>;
	}

	if (screenState === ScreenState.Error) {
		return <p className="text-3xl">{error}</p>;
	}

	if (screenState === ScreenState.DataReady && orderDetails) {
		const { orderItems, checkpoints, ...order } = orderDetails;
		return (
			<Card title="Order Details">
				<div className="grid gap-4 grid-cols-2 mb-2">
					{orderItems.map(({ article }) => (
						<div key={article.articleNumber}>
							<img
								src={article.articleImageUrl}
								alt={article.product_name}
							/>
							<h4 className="text-center">
								{article.product_name}
							</h4>
						</div>
					))}
				</div>
				<ul className="grid gap-4 grid-cols-2 mb-6">
					<OrderEntry
						label="Order Number"
						value={order.order_number}
					/>
					<OrderEntry
						label="Delivery Address"
						value={`${order.street}\n${order.zip_code} ${order.city}`}
					/>
					<OrderEntry label="Email" value={order.email} />
					<OrderEntry label="Customer Id" value={order.customerId} />
					<OrderEntry label="Courier" value={order.courier} />
					<OrderEntry
						label="Tracking Code"
						value={order.tracking_number}
					/>
				</ul>

				<h3 className="font-bold text-xl mb-2">Checkpoints</h3>
				<CheckpointTimeline checkpoints={checkpoints} />
			</Card>
		);
	}

	return null;
};
