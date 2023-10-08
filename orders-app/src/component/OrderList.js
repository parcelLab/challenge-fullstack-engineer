import React from "react";

const OrdersList = ({ orders, onSelectOrder }) => {
	return (
		<div>
			{Object.values(orders).map((order) => (
				<div
					className="order-list-container"
					key={order.orderNo || Math.random()}
				>
					<h2>Your Orders</h2>

					<ul className="order-list">
						<li className="order-item">
							<h3>Order Number: {order.orderNo}</h3>
							<p>Courier: {order.courier}</p>
							<p>Tracking Number:{order.tracking_number}</p>
							<p>
								Destination: {order.street}, {order.city}
							</p>
							<button
								onClick={() => onSelectOrder(order)}
								className="details-btn"
							>
								View Details
							</button>
						</li>
					</ul>
				</div>
			))}
		</div>
	);
};

export default OrdersList;
