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
	counter: {
		type: Number,
		required: false,
		default: 0,
	},
});
</script>

<template>
	<RouterLink :to="to" class="relative group">
		<span v-if="counter > 1">{{ counter }}</span>
		<div :style="{ backgroundImage: `url('${imageUrl}')` }">
			<p>{{ label }}</p>
		</div>
	</RouterLink>
</template>

<style scoped>
div {
	@apply flex flex-col justify-end items-stretch shadow-lg
	shadow-gray-400 border-gray-400 rounded-2xl w-32 h-40
	dark:shadow-gray-900 dark:border-gray-900 dark:text-gray-200
	hover:scale-105 transition-all duration-200 scale-100 origin-bottom
	bg-[center_left_30rem] overflow-hidden;
}

p {
	@apply bg-white dark:bg-gray-700 text-center pb-2;
}

span {
	@apply bg-green-700 z-10 min-w-10 min-h-10 rounded-full absolute -top-3 -right-3 text-center align-middle p-1 text-white
	group-hover:translate-x-2 group-hover:-translate-y-4 transition-all duration-200;
}

@screen md {
	div {
		@apply w-56 h-72 text-xl bg-[center_left_30rem];
	}
}
</style>
