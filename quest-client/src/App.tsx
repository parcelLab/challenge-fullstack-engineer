import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignInScreen from "./screens/SignInScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import { OrderDetailsScreen } from "./screens/OrderDetailsScreen";

function App() {
	return (
		<div className="h-screen flex items-center justify-center">
			<Router>
				<Routes>
					<Route path="/" element={<SignInScreen />} />
					<Route path="/orders" element={<OrdersScreen />} />
					<Route
						path="/order/:orderId"
						element={<OrderDetailsScreen />}
					/>
					<Route
						path="*"
						element={<p>There's nothing here: 404!</p>}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
