import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "@/pages/DashboardPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import HomePage from "@/pages/HomePage.vue";

export const router = createRouter({
	history: createWebHistory("/"),
	routes: [
		{
			path: "/home",
			name: "Home",
			component: HomePage,
			alias: "/",
			meta: {},
		},
		{
			path: "/login",
			name: "Login",
			component: LoginPage,
			meta: {
				breadcrumb: [{ name: "Login" }],
			},
		},
		{
			path: "/register",
			name: "Register",
			component: RegisterPage,
			meta: {
				breadcrumb: [{ name: "Register" }],
			},
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: DashboardPage,
			meta: {
				breadcrumb: [{ name: "Dashboard" }],
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	const publicPages = ["/login", "/register", "/home", "/"];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem("accessToken");

	if (authRequired && !loggedIn) {
		next("/login");
	} else {
		next();
	}
});
