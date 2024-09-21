<script lang="ts" setup>
import type { artistType } from "@/types";
import { toRefs } from "vue";

const props = defineProps<{
	artist: artistType;
}>();

const { artist } = toRefs(props);
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<h1 class="text-2xl">{{ artist.artistId ? $t("Edit artist") : $t("Create artist") }}</h1>
		<div>
			<input v-model="artist.name" />
		</div>
	</div>
</template>

<style scoped></style>
