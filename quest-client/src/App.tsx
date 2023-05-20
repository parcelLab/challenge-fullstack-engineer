import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignInScreen from "./screens/SignInScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import { OrderDetailsScreen } from "./screens/OrderDetailsScreen";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SignInScreen />} />
				<Route path="/orders" element={<OrdersScreen />} />
				<Route
					path="/order/:orderId"
					element={<OrderDetailsScreen />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
