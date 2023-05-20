import { AxiosError } from "axios";
import { axios } from "../axios";

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
			const response = await axios.post("/auth/signin", {
				email,
			});
			const data = response.data as Jwt;

			axios.defaults.headers.common["Authorization"] = data.access_token;

			return { data };
		} catch (error) {
			return {
				error: (error as AxiosError).message,
			};
		}
	};

	return {
		signin,
	};
};
