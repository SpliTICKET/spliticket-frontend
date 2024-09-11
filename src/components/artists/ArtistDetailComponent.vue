<script lang="ts" setup>
const props = defineProps<{
	artistId: string;
}>();
</script>

<template>
	<div>{{ artistId }}</div>
</template>

<style scoped></style>
