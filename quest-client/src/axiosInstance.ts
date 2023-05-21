import axios from "axios";
import { JWT_LOCAL_STORAGE_KEY } from "./contants";

const getAuthHeader = async () => {
	const savedToken = await localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
	if (savedToken) {
		return {
			Authorization: `Bearer ${savedToken}`,
		};
	}
	return undefined;
};

export const axiosInstance = axios.create({
	baseURL: "http://localhost:3000",
	timeout: 1000,
	headers: await getAuthHeader(),
});
