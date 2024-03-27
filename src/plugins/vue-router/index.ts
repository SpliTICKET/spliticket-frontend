import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "@/pages/DashboardPage.vue";
import AnimalsPage from "@/pages/AnimalsPage.vue";
import EnclosuresPage from "@/pages/EnclosuresPage.vue";
import AnimalDetailPage from "@/pages/AnimalDetailPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import HomePage from "@/pages/HomePage.vue";
import EnclosureDetailPage from "@/pages/EnclosureDetailPage.vue";

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
		{
			path: "/animals",
			name: "Animals",
			component: AnimalsPage,
			meta: {
				breadcrumb: [{ name: "Animals" }],
			},
		},
		{
			path: "/animal/:animalId/:animalName",
			name: "Animal",
			component: AnimalDetailPage,
			meta: {
				breadcrumb: [{ name: "Animals", link: "/animals" }, { name: ":animalName" }],
			},
		},
		{
			path: "/enclosures",
			name: "Enclosures",
			component: EnclosuresPage,
			meta: {
				breadcrumb: [{ name: "Enclosures" }],
			},
		},
		{
			path: "/enclosure/:enclosureId/:enclosureName",
			name: "Enclosure",
			component: EnclosureDetailPage,
			meta: {
				breadcrumb: [{ name: "Enclosures", link: "/enclosures" }, { name: ":enclosureName" }],
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
