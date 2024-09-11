<script lang="ts" setup>
defineProps({
	imageUrl: {
		type: String,
		required: false,
		default: "https://picsum.photos/400",
	},
	label: {
		type: String,
		required: true,
	},
	to: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<RouterLink :to="to">
		<div :style="{ backgroundImage: `url('${imageUrl}')` }">
			<p>{{ label }}</p>
		</div>
	</RouterLink>
</template>

<style scoped>
div {
	@apply w-56 h-72 flex flex-col justify-end items-stretch shadow-lg
	shadow-gray-400 border-gray-400 rounded-2xl
	dark:shadow-gray-900 dark:border-gray-900 dark:text-gray-200
	overflow-hidden hover:scale-110 transition-all duration-200 scale-100 origin-bottom;
}

p {
	@apply bg-white dark:bg-gray-700 text-center text-2xl pb-2;
}
</style>
