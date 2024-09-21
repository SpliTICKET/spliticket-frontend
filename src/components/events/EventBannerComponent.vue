Du:
<script setup lang="ts">
import type { eventType } from "@/types";

const props = defineProps<{
	event: eventType;
}>();

const address = props.event.venue!.address!;
const addressString = `${address.street} ${address.houseNumber}, ${address.postalCode} ${address.city}, ${address.country}`;
const startDate = new Date(props.event.date).toISOString().replace(/-|:|\.\d{3}/g, "");
const endDate = new Date(new Date(props.event.date).getTime() + 60 * 60 * 1000)
	.toISOString()
	.replace(/-|:|\.\d{3}/g, "");
const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(props.event.name)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(props.event.artists.map((artist) => artist.name).join(", "))}&location=${encodeURIComponent(addressString)}`;
</script>

<template>
	<div class="relative w-full">
		<img :src="event.imageUrl" alt="Background Image" class="w-full h-auto rounded-xl" />

		<div class="absolute inset-0 w-1/2 flex flex-col justify-center items-center gap-8 text-gray-200 p-10">
			<h1 class="text-2xl">{{ event.name }}</h1>
			<div class="flex flex-col items-center gap-2 w-full">
				<a :href="event.venue!.website" target="_blank">{{ event.venue!.name }}</a>
				<a :href="'https://www.google.de/maps/place/' + addressString" target="_blank">{{ addressString }}</a>
				<a :href="calendarUrl" target="_blank">{{ $d(event.date, "long") }}</a>
				<p>{{ event.price.amount.toFixed(2) + " " + event.price.currency }}</p>
				<p class="overflow-hidden overflow-ellipsis whitespace-nowrap w-full text-center">
					{{ event.artists.map((artist) => artist.name).join(", ") }}
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
