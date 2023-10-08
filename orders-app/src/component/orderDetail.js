import React from "react";

const OrderDetails = ({ order }) => {
	return (
		<div key={order.orderNo} className="order-card">
			<h2>Order Details</h2>
			<div className="order-info">
				<label>Order No:</label>
				<span>{order.orderNo}</span>
			</div>

			<div className="order-info">
				<label>Tracking No:</label>
				<span>{order.tracking_number}</span>
			</div>

			<div className="order-info">
				<label>Delivery Address:</label>
				<span>
					{order.street}, {order.city}
				</span>
			</div>

			<div className="order-info">
				<label>Current Status:</label>
				<span>{order.latestTracking.status_text}</span>
			</div>
			<div className="order-info">
				<label>Email:</label>
				<span>{order.email}</span>
			</div>

			<h3>Articles:</h3>
			<div>
				{order.articles.map((article) => (
					<div
						className="article-card"
						key={article.articleNo || Math.random()}
					>
						<img
							src={article.articleImageUrl}
							alt={article.product_name}
							className="article-image"
						/>
						<p> {article.product_name}</p>
						<p>Quantity: {article.quantity}</p>
					</div>
				))}
			</div>

			<h3>Latest Tracking</h3>
			<div className="tracking-info">
				<label>Status:</label>
				<span>{order.latestTracking.status}</span>
			</div>
			<div className="tracking-info">
				<label>Details:</label>
				<span>{order.latestTracking.status_text}</span>
				<span>{order.latestTracking.status_details}</span>
			</div>
		</div>
	);
};

export default OrderDetails;
