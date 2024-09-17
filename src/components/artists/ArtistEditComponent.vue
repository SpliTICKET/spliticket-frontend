<script lang="ts" setup>
import type { artistType } from "@/types";

defineProps<{
	artist: artistType;
}>();
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<h1 class="text-2xl">{{ artist.artistId ? $t("Edit artist") : $t("Create artist") }}</h1>
		<div>
			<input v-model="artist.name"/>
		</div>
	</div>

</template>

<style scoped></style>
