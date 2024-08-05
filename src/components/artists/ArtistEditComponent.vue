<script setup lang="ts">
import type { artistType } from "@/types";

defineProps<{
	artist: artistType;
}>();
</script>

<template>
	<div>{{ artist }}</div>
</template>

<style scoped></style>
