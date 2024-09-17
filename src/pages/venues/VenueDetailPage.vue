<script setup lang="ts">
import { useRoute } from "vue-router";
import VenueDetailComponent from "@/components/venues/VenueDetailComponent.vue";

const params = useRoute().params;
const venueId = params.venueId as string;
</script>

<template>
	<div>
		<suspense>
			<VenueDetailComponent :venue-id="venueId"></VenueDetailComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
