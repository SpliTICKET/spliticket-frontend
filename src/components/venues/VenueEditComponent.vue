<script lang="ts" setup>
import type { venueType } from "@/types";
import { toRefs } from "vue";

const props = defineProps<{
	venue: venueType;
}>();

const { venue } = toRefs(props);
</script>

<template>
	<div class="flex flex-col justify-center items-center gap-2">
		<h1 class="text-2xl">{{ venue.venueId ? $t("Edit Venue") : $t("Create Venue") }}</h1>
		<div class="w-96">
			<input v-model="venue.name" />
		</div>
	</div>
</template>

<style scoped></style>
