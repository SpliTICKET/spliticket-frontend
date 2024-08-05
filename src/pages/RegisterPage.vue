<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { userType } from "@/types";

const router = useRouter();

const store = useStore();

const user: userType = {
	username: "",
	email: "",
	firstName: "",
	lastName: "",
	password: "",
};

let loading = false;
let message = "";

const handleRegister = () => {
	loading = true;
	if (user.username && user.email && user.firstName && user.lastName && user.password) {
		store
			.dispatch("auth/register", user)
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
			@submit.prevent="handleRegister"
		>
			<h1 class="text-4xl pb-3">Register</h1>
			<div class="formRow">
				<label for="username">Username</label>
				<input v-model="user.username" type="text" name="username" required />
			</div>
			<div class="formRow">
				<label for="email">E-Mail</label>
				<input v-model="user.email" type="text" name="email" required />
			</div>
			<div class="formRow">
				<label for="firstName">First Name</label>
				<input v-model="user.firstName" type="text" name="firstName" required />
			</div>
			<div class="formRow">
				<label for="lastName">Last Name</label>
				<input v-model="user.lastName" type="text" name="lastName" required />
			</div>
			<div class="formRow">
				<label for="password">Password</label>
				<input v-model="user.password" type="password" name="password" required />
			</div>
			<div>
				<button :disabled="loading" class="border-2 rounded px-2">
					<span>Register</span>
				</button>
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
