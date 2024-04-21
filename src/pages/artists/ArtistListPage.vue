<script setup lang="ts">
import ArtistListComponent from "@/components/artists/ArtistListComponent.vue";
</script>

<template>
	<div>
		<suspense>
			<ArtistListComponent></ArtistListComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
