import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { JWT_LOCAL_STORAGE_KEY } from "../contants";

export const useAuthorizedRoute = () => {
	const navigate = useNavigate();

	const kickout = useCallback(() => navigate("/?kickout=true"), [navigate]);
	const logout = useCallback(() => {
		localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
		navigate("/");
	}, [navigate]);

	const checkIfLoggedIn = useCallback(() => {
		// check if JWT is stored
		const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

		// we could check if this token is valid here by checking the server
		// but the first api call will do this anyway
		return Boolean(token);
	}, []);

	const redirectToLoginIfNotAuthorized = useCallback(() => {
		if (!checkIfLoggedIn()) {
			kickout();
		}
	}, [checkIfLoggedIn, kickout]);

	return {
		logout,
		checkIfLoggedIn,
		kickout,
		redirectToLoginIfNotAuthorized,
	};
};
