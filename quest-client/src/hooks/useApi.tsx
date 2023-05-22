import { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance";
import { Order, OrderDetails, OrderWithOrderItems } from "../apiTypes";
import { JWT_LOCAL_STORAGE_KEY } from "../contants";

interface Jwt {
	access_token: string;
}

interface ApiResponse<T> {
	error?: AxiosError;
	data?: T;
}

export const useApi = () => {
	const signin = async (email: string): Promise<ApiResponse<Jwt>> => {
		try {
			const response = await axiosInstance.post("/auth/signin", {
				email,
			});
			const data = response.data as Jwt;

			// save jtw to local storage
			await localStorage.setItem(
				JWT_LOCAL_STORAGE_KEY,
				data.access_token
			);

			axiosInstance.defaults.headers.common[
				"Authorization"
			] = `Bearer ${data.access_token}`;

			return { data };
		} catch (error) {
			return { error: error as AxiosError };
		}
	};

	const getOrders = async (): Promise<ApiResponse<OrderWithOrderItems[]>> => {
		try {
			const response = await axiosInstance.get("/orders");

			const data = response.data.orders;

			return { data };
		} catch (error) {
			return { error: error as AxiosError };
		}
	};

	const getOrderDetails = async (
		orderNumber: string
	): Promise<ApiResponse<Order>> => {
		try {
			const response = await axiosInstance.get(`/orders/${orderNumber}`);

			const data = response.data.order;

			return { data };
		} catch (error) {
			return { error: error as AxiosError };
		}
	};

	return {
		signin,
		getOrders,
		getOrderDetails,
	};
};
