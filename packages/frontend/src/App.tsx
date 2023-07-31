import React from 'react';
import './App.scss';
import {Login} from './screens/Login';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import {UserTracking} from './screens/UserTracking';
import {loadersUserTrackings, loadTrackingById} from './loaders/loaders';
import {DetailedTracking} from './screens/DetailedTracking';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login/>,
	},
	{
		path: '/trackings',
		element: <UserTracking/>,
		loader: loadersUserTrackings,
	},
	{
		path: '/trackings/:id',
		element: <DetailedTracking/>,
		loader: loadTrackingById
	}
]);

function App() {
  return (
    <div className="App">
		<RouterProvider router={router} />
    </div>
  );
}

export default App;
