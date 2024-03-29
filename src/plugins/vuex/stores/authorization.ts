import * as authService from "@/services/authService";
import { self } from "@/services/userService";

export const authorization = {
	namespaced: true,
	state: {
		user: await self(),
		loggedIn: !!this?.user,
	},
	actions: {
		async login(context, inputUser) {
			try {
				await authService.login(inputUser);
				const fetchedUser = await self();
				context.commit("loginSuccess", fetchedUser);
				return fetchedUser;
			} catch (err) {
				context.commit("loginFailure");
				throw err;
			}
		},
		logout(context) {
			authService.logout();
			context.commit("logout");
		},
		async register(context, inputUser) {
			try {
				await authService.register(inputUser);
				const fetchedUser = await self();
				context.commit("registerSuccess", fetchedUser);
				return fetchedUser;
			} catch (err) {
				context.commit("registerFailure");
				throw err;
			}
		},
	},
	mutations: {
		loginSuccess(state, user) {
			state.loggedIn = true;
			state.user = user;
		},
		loginFailure(state) {
			state.loggedIn = false;
			state.user = null;
		},
		logout(state) {
			state.loggedIn = false;
			state.user = null;
		},
		registerSuccess(state, user) {
			state.loggedIn = false;
			state.user = user;
		},
		registerFailure(state) {
			state.loggedIn = false;
			state.user = null;
		},
	},
};
