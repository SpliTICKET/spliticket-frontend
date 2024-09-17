import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";
import DashboardPage from "@/pages/DashboardPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import HomePage from "@/pages/HomePage.vue";
import SplitListPage from "@/pages/splits/SplitListPage.vue";
import SplitDetailPage from "@/pages/splits/SplitDetailPage.vue";
import ArtistListPage from "@/pages/artists/ArtistListPage.vue";
import ArtistDetailPage from "@/pages/artists/ArtistDetailPage.vue";
import EventListPage from "@/pages/events/EventListPage.vue";
import EventDetailPage from "@/pages/events/EventDetailPage.vue";
import VenueListPage from "@/pages/venues/VenueListPage.vue";
import VenueDetailPage from "@/pages/venues/VenueDetailPage.vue";

export const router = createRouter({
	history: createWebHistory("/"),
	routes: [
		{ path: "/home", name: "Home", component: HomePage, alias: "/" },
		{ path: "/login", name: "Login", component: LoginPage },
		{ path: "/register", name: "Register", component: RegisterPage },
		{ path: "/dashboard", name: "Dashboard", component: DashboardPage },
		{ path: "/artists", name: "Artists", component: ArtistListPage },
		{ path: "/artist/:artistId", name: "Artist", component: ArtistDetailPage },
		{ path: "/venues", name: "Venues", component: VenueListPage },
		{ path: "/venue/:venueId", name: "Venue", component: VenueDetailPage },
		{ path: "/event", name: "Events", component: EventListPage },
		{ path: "/event/:eventId", name: "Event", component: EventDetailPage },
		{ path: "/splits", name: "Splits", component: SplitListPage },
		{ path: "/split/:splitId", name: "Split", component: SplitDetailPage },
	],
});

router.beforeEach(async (to, from, next) => {
	await store.dispatch("auth/loadUser").catch();

	const publicPages = ["login", "register", "home", "", "split"];
	const authRequired = !publicPages.includes(to.path.split("/")[1]);

	const moderatorPages = ["artists", "artist", "venues", "venue", "events", "event"];
	const moderatorPermissionRequired = moderatorPages.includes(to.path.split("/")[1]);

	if (authRequired && !store.getters["auth/isAuthenticated"]) {
		next("/login");
	} else if (moderatorPermissionRequired && !store.getters["auth/isModerator"]) {
		next("/dashboard");
	} else {
		next();
	}
});
