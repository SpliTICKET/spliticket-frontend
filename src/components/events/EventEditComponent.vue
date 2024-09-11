<script lang="ts" setup>
import type { eventType, venueType } from "@/types";

defineProps<{
	event: eventType;
}>();

const venues: venueType[] = []; // TODO await getVenues();
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<h1 class="text-2xl">{{ event.eventId ? $t("Edit Event") : $t("Create Event") }}</h1>
		<div>
			<select v-model="event.venue!.venueId">
				<option disabled selected value="">{{ $t("Choose a venue...") }}</option>
				<option v-for="venue in venues" :key="venue.venueId" :value="venue.venueId">
					{{ venue.venueId }}
				</option>
			</select>
		</div>
	</div>
</template>

<style scoped></style>
