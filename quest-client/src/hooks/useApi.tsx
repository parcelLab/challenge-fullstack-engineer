import { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance";
import { Order } from "../types";

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
			const response = await axiosInstance.get("/tracking");

			const data = response.data;

			return { data: data.trackings };
		} catch (error) {
			return {
				error: (error as AxiosError).message,
			};
		}
	};

	return {
		signin,
		getOrders,
	};
};
