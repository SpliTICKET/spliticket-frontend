<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { userType } from "@/types";

const router = useRouter();

const store = useStore();

const user: userType = {
	username: "",
	password: "",
};

let loading = false;
let message = "";

const handleLogin = () => {
	loading = true;
	if (user.username && user.password) {
		store
			.dispatch("auth/login", user)
			.then(() => {
				router.push({ path: "/dashboard" });
			})
			.catch((error) => {
				loading = false;
				message = error.response && error.response.data ? error.message : error.toString();
			});
	}
};
</script>

<template>
	<div class="flex gap-4 justify-center items-center">
		<form
			class="flex flex-col gap-4 items-center justify-center shadow-2xl shadow-black rounded-xl p-6"
			@submit.prevent="handleLogin"
		>
			<h1 class="text-4xl pb-3">{{ $t("Login") }}</h1>
			<div class="formRow">
				<label for="username">{{ $t("Username") }}</label>
				<input v-model="user.username" type="text" name="username" required />
			</div>
			<div class="formRow">
				<label for="password">{{ $t("Password") }}</label>
				<input v-model="user.password" type="password" name="password" required />
			</div>
			<div>
				<button :disabled="loading" class="border-2 rounded px-2">
					<span>{{ $t("Login") }}</span>
				</button>
			</div>
			<div class="flex flex-col text-sm items-center">
				<p>Haven't registered yet? Register <a href="/register" class="text-green-500">here</a>!</p>
			</div>
			<div>
				<div v-if="message">{{ message }}</div>
			</div>
		</form>
	</div>
</template>

<style scoped>
.formRow {
	@apply flex flex-row gap-4 justify-between text-lg w-full;
}

.formRow input {
	@apply border-2;
}
</style>
