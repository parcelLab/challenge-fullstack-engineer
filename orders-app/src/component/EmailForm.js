import React, { useState } from "react";

const EmailForm = ({ onSubmit }) => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(email);
	};

	return (
		<div className="email-screen-container">
			<h2>Enter Your Email</h2>
			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
					/>
				</div>
				<button type="submit">Search Orders</button>
			</form>
		</div>
	);
};

export default EmailForm;
