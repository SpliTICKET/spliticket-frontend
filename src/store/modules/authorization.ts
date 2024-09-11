import type { Module } from "vuex";
import type { RootState } from "@/store";
import { login as loginService, logout as logoutService, register as registerService } from "@/services/authService";
import type { permissionType, userType } from "@/types";
import { self } from "@/services/userService";

export interface AuthState {
	user: userType | null;
	token: string | null;
}

const state: AuthState = {
	user: null,
	token: localStorage.getItem("accessToken"),
};

const mutations = {
	setUser(state: AuthState, user: userType) {
		state.user = user;
	},
	setToken(state: AuthState, token: string) {
		state.token = token;
		localStorage.setItem("accessToken", token);
	},
	logout(state: AuthState) {
		state.user = null;
		state.token = null;
		localStorage.removeItem("accessToken");
	},
};

const actions = {
	async loadUser({ commit }: any) {
		const token = localStorage.getItem("accessToken");
		if (token && !state.user) {
			try {
				const user = await self();
				if (user) {
					commit("setUser", user);
					commit("setToken", token);
				} else {
					commit("logout");
				}
			} catch (error) {
				console.error("Failed to load user:", error);
				commit("logout");
			}
		}
	},
	async login({ commit }: any, { username, password }: { username: string; password: string }) {
		try {
			const response = await loginService({ username, password });
			if (response.accessToken) {
				commit("setToken", response.accessToken);

				const user = await self();
				if (user) {
					commit("setUser", user);
				}
			}
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	logout({ commit }: any) {
		logoutService();
		commit("logout");
	},
	async register(
		{ commit }: any,
		user: { username: string; email: string; firstName: string; lastName: string; password: string }
	) {
		try {
			const response = await registerService(user);
			if (response.accessToken) {
				commit("setToken", response.accessToken);

				const userData = await self();
				if (userData) {
					commit("setUser", userData);
				}
			}
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};

const getters = {
	isAuthenticated(state: AuthState): boolean {
		return !!state.token;
	},
	user(state: AuthState): userType | null {
		return state.user;
	},
	isModerator(state: AuthState): boolean {
		return !!state.user?.permissions?.map((permission: permissionType) => permission.name).includes("MODERATOR");
	},
};

export const auth: Module<AuthState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
