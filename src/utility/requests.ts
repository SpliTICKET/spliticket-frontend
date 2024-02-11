import axios, { type AxiosResponse } from "axios";
import { useStore } from "vuex";

function buildUrl(endpoint: string) {
	return `/api/${endpoint}`.replaceAll(/\/+/g, "/");
}

function authHeader() {
	const accessToken = localStorage.getItem("accessToken");

	if (accessToken) {
		return { Authorization: "Bearer " + accessToken };
	} else {
		return {};
	}
}

export function getRequest(endpoint: string) {
	return new Promise((resolve, reject) => {
		axios
			.get(buildUrl(endpoint), { headers: authHeader() })
			.then((response: AxiosResponse) => resolve(response.data))
			.catch((error: AxiosResponse) => {
				if (error.response.status === 401 && useStore()) useStore().dispatch("auth/logout");
				reject(error);
			});
	});
}

export function postRequest(endpoint: string, data: object) {
	return new Promise((resolve, reject) => {
		axios
			.post(buildUrl(endpoint), JSON.stringify(data), {
				headers: Object.assign({ "Content-Type": "application/json" }, authHeader()),
			})
			.then((response: AxiosResponse) => resolve(response.data))
			.catch((error: AxiosResponse) => {
				if (error.response.status === 401) localStorage.removeItem("accessToken");
				reject(error);
			});
	});
}
