<script setup lang="ts">
import EventListComponent from "@/components/events/EventListComponent.vue";
</script>

<template>
	<div>
		<suspense>
			<EventListComponent></EventListComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
