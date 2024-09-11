import { createStore } from "vuex";
import { auth, type AuthState } from "./modules/authorization";

export interface RootState {
	auth: AuthState;
}

export const store = createStore<RootState>({
	modules: {
		auth,
	},
});
