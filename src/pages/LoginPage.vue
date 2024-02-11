<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { userType } from "@/utility/types";

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
				message = (error.response && error.response.data) || error.message || error.toString();
			});
	}
};
</script>

<template>
	<form @submit.prevent="handleLogin">
		<div>
			<label for="username">Username</label>
			<input v-model="user.username" type="text" name="username" required />
		</div>
		<div>
			<label for="password">Password</label>
			<input v-model="user.password" type="password" name="password" required />
		</div>
		<div>
			<button :disabled="loading">
				<span>Login</span>
			</button>
		</div>
		<div>
			<div v-if="message">{{ message }}</div>
		</div>
	</form>
</template>

<style scoped></style>
