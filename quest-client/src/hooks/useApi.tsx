import { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance";
import { Order, OrderDetails } from "../apiTypes";
import { JWT_LOCAL_STORAGE_KEY } from "../contants";

interface Jwt {
	access_token: string;
}

interface ApiResponse<T> {
	error?: string;
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
			localStorage.setItem(JWT_LOCAL_STORAGE_KEY, data.access_token);

			axiosInstance.defaults.headers.common[
				"Authorization"
			] = `Bearer ${data.access_token}`;

			return { data };
		} catch (error) {
			return {
				error: (error as AxiosError).message,
			};
		}
	};

	const getOrders = async (): Promise<ApiResponse<Order[]>> => {
		try {
			const response = await axiosInstance.get("/orders");

			const data = response.data;

			return { data: data.orders };
		} catch (error) {
			return {
				error: (error as AxiosError).message,
			};
		}
	};

	const getOrderDetails = async (
		orderNumber: string
	): Promise<ApiResponse<OrderDetails>> => {
		try {
			const response = await axiosInstance.get(`/orders/${orderNumber}`);

			const data = response.data;

			return { data };
		} catch (error) {
			return {
				error: (error as AxiosError).message,
			};
		}
	};

	return {
		signin,
		getOrders,
		getOrderDetails,
	};
};
