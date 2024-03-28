<script setup lang="ts">
defineProps<{
	propName: string;
}>();
</script>

<template>
	<div>
		<h1 class="text-5xl">EmptyComponent</h1>
		<h2>PropName: {{ propName }}</h2>
	</div>
</template>

<style scoped></style>
