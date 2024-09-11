<script lang="ts" setup>
import type { artistType } from "@/types";

defineProps<{
	artist: artistType;
}>();
</script>

<template>
	<div>{{ artist }}</div>
</template>

<style scoped></style>
