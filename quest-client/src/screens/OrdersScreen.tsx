import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { ScreenState } from "../types";
import { Card } from "../components/Card";
import { OrderPreview } from "../components/OrderPreview";
import { OrderWithOrderItems } from "../apiTypes";
import { useAuthorizedRoute } from "../hooks/useAuthorizedRoute";

export const OrdersScreen = () => {
	const { kickout } = useAuthorizedRoute();

	const [screenState, setScreenState] = useState<ScreenState>(
		ScreenState.Loading
	);

	const [error, setError] = useState<string>();

	const [orders, setOrders] = useState<OrderWithOrderItems[]>();

	const { getOrders } = useApi();

	useEffect(() => {
		if (orders) return;

		async function fetchAndSetOrders() {
			const response = await getOrders();

			if (response.data) {
				setOrders(response.data);
				setScreenState(ScreenState.DataReady);
			}

			if (response.error?.code === "ERR_BAD_REQUEST") kickout();

			if (response.error) {
				setError(response.error.message);
				setScreenState(ScreenState.Error);
			}
		}
		fetchAndSetOrders();
	}, [getOrders, kickout, orders]);

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
					<OrderPreview key={order.id} order={order} />
				))}
			</Card>
		);
	}

	return null;
};
