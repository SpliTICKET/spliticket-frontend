Du:
<script setup lang="ts">
import type { eventType } from "@/types";

const props = defineProps<{
	event: eventType;
}>();

const address = props.event.venue!.address!;
const addressString = `${address.street} ${address.houseNumber}, ${address.postalCode} ${address.city}, ${address.country}`;
const date = new Date(props.event.date!);
const startDate = date.toISOString().replace(/-|:|\.\d{3}/g, "");
const endDate = new Date(date.getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d{3}/g, "");
const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(props.event.name!)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(props.event.artists!.map((artist) => artist.name).join(", "))}&location=${encodeURIComponent(addressString)}`;
</script>

<template>
	<div class="relative w-full">
		<img v-if="!!event.imageUrl" :src="event.imageUrl" alt="Background Image" class="w-full h-auto md:rounded-xl" />

		<div
			class="flex flex-col justify-center items-center gap-4 md:gap-8 p-2 md:p-10 overflow-hidden"
			:class="{
				'text-gray-800 w-auto my-5 md:my-0': !event.imageUrl,
				'lg:w-1/2 lg:absolute lg:inset-0 lg:text-gray-200 text-gray-800 w-auto ': !!event.imageUrl,
			}"
		>
			<h1 class="text-2xl text-center">{{ event.name }}</h1>
			<div class="flex flex-col items-center gap-1 md:gap-2 w-full text-center">
				<a :href="event.venue!.website" target="_blank">{{ event.venue!.name }}</a>
				<a :href="'https://www.google.de/maps/place/' + addressString" target="_blank">{{ addressString }}</a>
				<a :href="calendarUrl" target="_blank">{{ $d(date, "long") }}</a>
				<p>{{ event.price!.amount.toFixed(2) + " " + event.price!.currency }}</p>
				<p
					v-if="!!event.artists && event.artists.length > 0"
					class="overflow-hidden overflow-ellipsis whitespace-nowrap w-full text-center"
				>
					<span v-if="event.artists.length === 1">
						{{ event.artists[0].name }}
					</span>
					<span v-else>
						{{
							event.artists
								.slice(0, -1)
								.map((artist) => artist.name)
								.join(", ")
						}}
						{{ $t("and") }}
						{{ event.artists.slice(-1)[0].name }}
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
