import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignInScreen from "./screens/SignInScreen";
import { OrdersScreen } from "./screens/OrdersScreen";
import { OrderDetailsScreen } from "./screens/OrderDetailsScreen";
import { Navigation } from "./components/Navigation";

function App() {
	return (
		<div>
			<Router>
				<Navigation />
				<div className="h-screen flex items-center justify-center">
					<Routes>
						<Route path="/" element={<SignInScreen />} />
						<Route path="/orders" element={<OrdersScreen />} />
						<Route
							path="/order/:orderNumber"
							element={<OrderDetailsScreen />}
						/>
						<Route
							path="*"
							element={<p>There's nothing here: 404!</p>}
						/>
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
