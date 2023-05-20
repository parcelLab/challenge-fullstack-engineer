import { useParams } from "react-router-dom";

export const OrderDetailsScreen = () => {
	const { orderId } = useParams();
	return <div>Orders details, orderId {orderId}</div>;
};
