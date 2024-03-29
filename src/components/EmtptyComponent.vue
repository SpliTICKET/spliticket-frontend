<script setup lang="ts">
defineProps<{
	h2: string;
	p: string;
}>();
</script>

<template>
	<div class="flex flex-col gap-4 p-5">
		<h1 class="text-5xl">EmptyComponent</h1>
		<h2 v-if="h2">{{ h2 }}</h2>
		<p v-if="p">{{ p }}</p>
	</div>
</template>

<style scoped></style>
