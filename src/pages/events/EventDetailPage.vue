<script setup lang="ts">
import { useRoute } from "vue-router";
import EventDetailComponent from "@/components/events/EventDetailComponent.vue";

const params = useRoute().params;
const eventId = params.eventId as string;
</script>

<template>
	<div>
		<suspense>
			<EventDetailComponent :event-id="eventId"></EventDetailComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
