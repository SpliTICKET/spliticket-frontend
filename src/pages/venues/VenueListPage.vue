<script setup lang="ts">
import VenueListComponent from "@/components/venues/VenueListComponent.vue";
</script>

<template>
	<div>
		<suspense>
			<VenueListComponent></VenueListComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
