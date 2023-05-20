import { default as npmAxios } from "axios";

export const axios = npmAxios.create({
	baseURL: "http://localhost:3000",
	timeout: 1000,
});
