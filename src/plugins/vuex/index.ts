import { authorization } from "@/plugins/vuex/stores/authorization";

import { createStore } from "vuex";

export const store = createStore({
	modules: {
		auth: authorization,
	},
});
