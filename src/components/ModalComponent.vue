<script lang="ts" setup>
defineProps({
	isOpen: Boolean,
});

defineEmits(["click-outside"]);
</script>

<template>
	<div
		v-if="isOpen"
		class="fixed top-0 left-0 bottom-0 right-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
		@click="(e) => ($el == e.target ? $emit('click-outside') : {})"
	>
		<div class="bg-white dark:bg-gray-700 rounded-xl p-4" @click="() => {}">
			<slot name="content">Default Content</slot>
		</div>
	</div>
</template>

<style scoped></style>
