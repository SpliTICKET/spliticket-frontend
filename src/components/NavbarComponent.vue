<script setup lang="ts">
import NavbarItemComponent from "@/components/NavbarItemComponent.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { logout } from "@/services/authService";

const store = useStore();

const user = computed(() => store.state.auth.user);
</script>

<template>
	<div class="bg-green-900 w-full h-14 flex flex-row justify-between items-center px-4">
		<RouterLink :to="user ? '/dashboard' : '/'" class="text-4xl align-middle">TerraTrack </RouterLink>
		<div v-if="user" class="flex flex-row gap-4 text-2xl">
			<NavbarItemComponent page-name="Dashboard"></NavbarItemComponent>
			<NavbarItemComponent page-name="Animals"></NavbarItemComponent>
			<NavbarItemComponent page-name="Enclosures"></NavbarItemComponent>
			<span class="border-l-2 border-transparent bg-green-950"></span>
			<div
				class="text-2xl cursor-pointer"
				@click="
					() => {
						logout();
						$router.go(0);
					}
				"
			>
				{{ user["firstName"] + " " + user["lastName"] }}
			</div>
		</div>
		<RouterLink v-if="!user" to="/login" class="text-2xl">Login</RouterLink>
	</div>
</template>

<style scoped></style>
