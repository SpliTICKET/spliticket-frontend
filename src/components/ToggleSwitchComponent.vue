<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
	isActive: {
		type: Boolean,
		required: true,
	},
	toggleActive: {
		type: Function,
		required: true,
	},
});

const { isActive } = toRefs(props);
</script>

<template>
	<div>
		<input v-model="isActive" type="checkbox" class="sr-only peer" />
		<div
			class="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-800"
			@click="toggleActive()"
		></div>
	</div>
</template>

<style scoped></style>
