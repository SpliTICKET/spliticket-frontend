import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "@/pages/DashboardPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import HomePage from "@/pages/HomePage.vue";
import SplitListPage from "@/pages/splits/SplitListPage.vue";
import SplitDetailPage from "@/pages/splits/SplitDetailPage.vue";
import ArtistListPage from "@/pages/artists/ArtistListPage.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export const router = createRouter({
	history: createWebHistory("/"),
	routes: [
		{
			path: "/home",
			name: "Home",
			component: HomePage,
			alias: "/",
		},
		{
			path: "/login",
			name: "Login",
			component: LoginPage,
		},
		{
			path: "/register",
			name: "Register",
			component: RegisterPage,
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: DashboardPage,
		},
		{
			path: "/splits",
			name: "Splits",
			component: SplitListPage,
		},
		{
			path: "/split/:splitId",
			name: "Split",
			component: SplitDetailPage,
		},
		{
			path: "/artists",
			name: "Artists",
			component: ArtistListPage,
		},
	],
});

router.beforeEach((to, from, next) => {
	const publicPages = ["login", "register", "home", "", "split"];
	const authRequired = !publicPages.includes(to.path.split("/")[1]);
	const loggedIn = localStorage.getItem("accessToken");

	if (authRequired && !loggedIn) {
		next("/login");
	} else {
		next();
	}
});
