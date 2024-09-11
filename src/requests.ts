import axios, { type AxiosResponse } from "axios";
import { store } from "@/store";

function buildUrl(endpoint: string) {
	return `/api/${endpoint}`.replaceAll(/\/+/g, "/");
}

function authHeader() {
	const accessToken = store.state.auth.token;

	if (accessToken) {
		return { Authorization: "Bearer " + accessToken };
	} else {
		return {};
	}
}

function request(method: "get" | "post" | "patch", endpoint: string, data?: object) {
	return new Promise((resolve, reject) => {
		axios({
			method,
			url: buildUrl(endpoint),
			data: JSON.stringify(data),
			headers: Object.assign({ "Content-Type": "application/json" }, authHeader()),
		})
			.then((response: AxiosResponse) => resolve(response.data))
			.catch((error: any) => {
				if (error.response && error.response.status === 401) {
					store.dispatch("auth/logout");
				}
				reject(error);
			});
	});
}

export function getRequest(endpoint: string) {
	return request("get", endpoint);
}

export function postRequest(endpoint: string, data: object) {
	return request("post", endpoint, data);
}

export function patchRequest(endpoint: string, data: object) {
	return request("patch", endpoint, data);
}
