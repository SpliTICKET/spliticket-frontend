import { authorization } from "@/store/modules/authorization";

import { createStore } from "vuex";

export const store = createStore({
	modules: {
		auth: authorization,
	},
});
