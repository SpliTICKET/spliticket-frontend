import { postRequest } from "@/utility/requests";

export function login(user: { username: string; password: string }) {
	return postRequest("login", {
		username: user.username,
		password: user.password,
	}).then((response: any) => {
		if (response["accessToken"]) {
			localStorage.setItem("accessToken", response["accessToken"]);
		}

		return response;
	});
}

export function logout() {
	localStorage.removeItem("accessToken");
}

export function register(user: {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}) {
	return postRequest("register", {
		username: user.username,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		password: user.password,
	}).then((response: any) => {
		if (response["accessToken"]) {
			localStorage.setItem("accessToken", response["accessToken"]);
		}

		return response;
	});
}
