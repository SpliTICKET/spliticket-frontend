<script setup lang="ts">
import { useRoute } from "vue-router";
import ArtistDetailComponent from "@/components/artists/ArtistDetailComponent.vue";

const params = useRoute().params;
const artistId = params.artistId as string;
</script>

<template>
	<div>
		<suspense>
			<ArtistDetailComponent :artist-id="artistId"></ArtistDetailComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
