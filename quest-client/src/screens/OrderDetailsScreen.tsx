import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { useApi } from "../hooks/useApi";
import { ScreenState } from "../types";
import { CheckpointTimeline } from "../components/CheckpointTimeline";
import { OrderEntry } from "../components/OrderEntry";
import { OrderDetails } from "../apiTypes";

export const OrderDetailsScreen = () => {
	const { orderNumber } = useParams();
	const [screenState, setScreenState] = useState<ScreenState>(
		ScreenState.Loading
	);

	const [error, setError] = useState<string>();

	const [orderDetails, setOrderDetails] = useState<OrderDetails>();

	const { getOrderDetails } = useApi();

	useEffect(() => {
		if (!orderNumber || orderDetails) return;

		async function fetchAndSetOrders() {
			const response = await getOrderDetails(orderNumber as string);

			if (response.data) {
				console.log(response);
				setOrderDetails(response.data);
				setScreenState(ScreenState.DataReady);
			}
			if (response.error) {
				setError(response.error);
				setScreenState(ScreenState.Error);
			}
		}
		fetchAndSetOrders();
	}, [getOrderDetails, orderDetails, orderNumber]);

	if (screenState === ScreenState.Loading) {
		return <p className="text-3xl">Loading, please wait</p>;
	}

	if (screenState === ScreenState.Error) {
		return <p className="text-3xl">{error}</p>;
	}

	if (screenState === ScreenState.DataReady && orderDetails) {
		const { order, checkpoints } = orderDetails;
		return (
			<Card title="Order Details">
				<h2 className="text-lg mb-2 text-center">
					{order.product_name}
				</h2>
				<img
					className="d-block mx-auto mb-4"
					src={order.articleImageUrl}
				/>
				<ul className="grid gap-4 grid-cols-2 mb-6">
					<OrderEntry
						label="Order Number"
						value={order.order_number}
					/>
					<OrderEntry label="Courier" value={order.courier} />
					<OrderEntry label="Product" value={order.product_name} />
					<OrderEntry
						label="Delivery Address"
						value={`${order.street}\n${order.zip_code} ${order.city}`}
					/>
				</ul>

				<h3 className="font-bold text-xl mb-2">Checkpoints</h3>
				<CheckpointTimeline checkpoints={checkpoints} />
			</Card>
		);
	}

	return null;
};
