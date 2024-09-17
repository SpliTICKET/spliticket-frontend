<script lang="ts" setup>
import NavbarItemComponent from "@/components/navabr/NavbarItemComponent.vue";
import { useStore } from "vuex";
import { computed, type Ref, ref } from "vue";
import { logout } from "@/services/authService";
import { useDark, useToggle } from "@vueuse/core";
import ToggleSwitchComponent from "@/components/ToggleSwitchComponent.vue";
import IconMenu from "@/components/icons/IconMenu.vue";

const store = useStore();

const user = computed(() => store.state.auth.user);
const moderatorView = computed(() => store.getters["auth/isModerator"]);

const profileDialogOpened: Ref<boolean> = ref(false);
const isMenuOpen: Ref<boolean> = ref(false);

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
	<div class="bg-green-900 w-full z-30  px-4">
		<div class="h-14 flex flex-row justify-between items-center">
			<RouterLink :to="user ? '/dashboard' : '/'" class="text-4xl align-middle">SpliTICKET</RouterLink>

			<button @click="isMenuOpen = !isMenuOpen" class="lg:hidden w-10">
				<IconMenu class="text-white"></IconMenu>
			</button>

			<div v-if="!!user" class="hidden lg:flex lg:flex-row gap-4 text-2xl">
				<NavbarItemComponent :label="$t('Dashboard')" to="Dashboard"></NavbarItemComponent>
				<NavbarItemComponent v-if="moderatorView" :label="$t('Artists')" to="Artists"></NavbarItemComponent>
				<NavbarItemComponent v-if="moderatorView" :label="$t('Venues')" to="Venues"></NavbarItemComponent>
				<NavbarItemComponent v-if="moderatorView" :label="$t('Events')" to="Events"></NavbarItemComponent>
				<NavbarItemComponent :label="$t('Splits')" to="Splits"></NavbarItemComponent>

				<span class="border-l-2 border-transparent bg-green-950"></span>

				<div class="flex justify-center">
					<button class="text-2xl cursor-pointer" @click="() => (profileDialogOpened = !profileDialogOpened)">
						{{ user["firstName"] + " " + user["lastName"] }}
					</button>

					<div
						:class="{ 'scale-100': profileDialogOpened }"
						class="absolute w-auto px-2 py-2 mt-12 min-w-max border-gray-300 border-2 rounded-md shadow-lg text-white bg-white text-xs font-bold transition-all duration-100 scale-0 origin-center z-50 flex flex-col justify-center items-center gap-2 user-menu"
					>
						<ToggleSwitchComponent :is-active="isDark" :toggle-active="toggleDark" />
						<button
							@click="
							() => {
								logout();
								$router.go(0);
							}
						"
						>
							{{ $t("Logout") }}
						</button>
					</div>
				</div>
			</div>
			<RouterLink v-if="!user" class="text-2xl" to="/login">{{ $t("Login") }}</RouterLink>

			<div
				v-if="profileDialogOpened"
				ref="profileDialogBackdrop"
				class="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black bg-opacity-0 flex justify-center items-center"
				@click="(e) => (e.target === $refs.profileDialogBackdrop ? (profileDialogOpened = false) : {})"
			></div>
		</div>

		<div v-if="!!user && isMenuOpen" class="lg:hidden bg-green-900 text-white text-2xl flex flex-col gap-4 p-4">
			<NavbarItemComponent :label="$t('Dashboard')" to="Dashboard"></NavbarItemComponent>
			<NavbarItemComponent v-if="moderatorView" :label="$t('Artists')" to="Artists"></NavbarItemComponent>
			<NavbarItemComponent v-if="moderatorView" :label="$t('Venues')" to="Venues"></NavbarItemComponent>
			<NavbarItemComponent v-if="moderatorView" :label="$t('Events')" to="Events"></NavbarItemComponent>
			<NavbarItemComponent :label="$t('Splits')" to="Splits"></NavbarItemComponent>

			<div class="border-t-2 border-green-800 mt-2 pt-2">
				<ToggleSwitchComponent :is-active="isDark" :toggle-active="toggleDark" />
				<button @click="() => { logout(); $router.go(0); }">
					{{ $t("Logout") }}
				</button>
			</div>
		</div>
	</div>
</template>


<style scoped>
.user-menu > button {
	@apply text-center bg-green-900 rounded-md text-lg w-24;
}
</style>
