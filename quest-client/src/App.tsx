import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignInScreen from "./screens/SignInScreen";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SignInScreen />} />
			</Routes>
		</Router>
	);
}

export default App;
