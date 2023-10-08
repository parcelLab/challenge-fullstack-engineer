/* eslint-disable no-undef */
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import EmailForm from "./component/EmailForm";
import OrdersList from "./component/OrderList";
import OrderDetails from "./component/orderDetail";

function App() {
	const [screen, setScreen] = useState(1);
	const [error, setError] = useState(null);
	const [orders, setOrders] = useState({});
	const [selectedOrder, setSelectedOrder] = useState(null);

	const fetchOrders = async (email) => {
		try {
			if (email.trim() === "") {
				setError("Please provide Email Address.");
				return;
			}
			setError(null);
			let response = await axios.get(
				`http://localhost:3000/api/orders/${email}`
			);

			setOrders(response.data.data);
			setScreen(2);
		} catch (error) {
			setError(error.response.data.message);
			console.error(
				"Error fetching orders:",
				error.response.data.message
			);
		}
	};

	const handleOrderSelect = (order) => {
		setSelectedOrder(order);
		setScreen(3);
	};

	return (
		<div className="App">
			{error && <p className="error-message">{error}</p>}
			{screen === 1 && <EmailForm onSubmit={fetchOrders} />}
			{screen === 2 && (
				<OrdersList orders={orders} onSelectOrder={handleOrderSelect} />
			)}
			{screen === 3 && selectedOrder && (
				<OrderDetails order={selectedOrder} />
			)}
		</div>
	);
}

export default App;
