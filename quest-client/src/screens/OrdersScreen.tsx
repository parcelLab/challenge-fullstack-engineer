import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { ScreenState } from "../types";
import { Card } from "../components/Card";
import { OrderPreview } from "../components/OrderPreview";
import { Order } from "../apiTypes";

export const OrdersScreen = () => {
	const [screenState, setScreenState] = useState<ScreenState>(
		ScreenState.Loading
	);

	const [error, setError] = useState<string>();

	const [orders, setOrders] = useState<Order[]>();

	const { getOrders } = useApi();

	useEffect(() => {
		if (orders) return;

		async function fetchAndSetOrders() {
			const response = await getOrders();

			if (response.data) {
				console.log(response);
				setOrders(response.data);
				setScreenState(ScreenState.DataReady);
			}
			if (response.error) {
				setError(response.error);
				setScreenState(ScreenState.Error);
			}
		}
		fetchAndSetOrders();
	}, [getOrders, orders]);

	if (screenState === ScreenState.Loading) {
		return <p className="text-3xl">Loading, please wait</p>;
	}

	if (screenState === ScreenState.Error) {
		return <p className="text-3xl">{error}</p>;
	}

	if (screenState === ScreenState.DataReady && orders) {
		return (
			<Card title="Orders">
				{orders.map((order) => (
					<OrderPreview order={order} />
				))}
			</Card>
		);
	}

	return null;
};
