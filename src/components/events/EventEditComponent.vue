<script lang="ts" setup>
import type { artistType, eventType, venueType } from "@/types";
import { getVenues } from "@/services/venueService";
import { getArtists } from "@/services/artistService";
import { ref, toRefs, watch } from "vue";

const props = defineProps<{
	event: eventType;
}>();

const { event } = toRefs(props);

event.value.artists = event.value.artists || [];
event.value.price = event.value.price || { amount: 0.0, currency: "EUR" };
event.value.website = event.value.website || "";
event.value.imageUrl = event.value.imageUrl || "";
event.value.date = event.value.date || new Date().toISOString();

const venues: venueType[] = await getVenues();
const artists: artistType[] = await getArtists();
const selectedArtist = "";

watch(
	() => event.value.date,
	(newDate) => {
		event.value.date = new Date(newDate!).toISOString();
	}
);

const formattedDate = ref(event.value.date.slice(0, 16));

const updateDate = (inputEvent: Event) => {
	const input = inputEvent.target as HTMLInputElement;
	event.value.date = new Date(input.value).toISOString();
	formattedDate.value = event.value.date.slice(0, 16);
};
</script>

<template>
	<div class="flex flex-col justify-center items-center gap-6 p-6 bg-white rounded-lg w-144">
		<h1 class="text-3xl font-semibold">
			{{ event.eventId ? $t("Edit Event") : $t("Create Event") }}
		</h1>

		<div class="flex flex-col w-full gap-4">
			<div class="flex flex-col">
				<label class="text-sm font-medium text-gray-600">{{ $t("Event Name") }}</label>
				<input
					v-model="event.name"
					class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					:placeholder="$t('Enter event name')"
				/>
			</div>

			<div class="flex flex-col">
				<label class="text-sm font-medium text-gray-600">{{ $t("Price") }}</label>
				<div class="flex items-center gap-2">
					<input
						v-model="event.price!.amount"
						type="number"
						class="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						:placeholder="$t('Amount')"
					/>
					<select
						v-model="event.price!.currency"
						class="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						<option value="EUR">EUR</option>
						<option value="USD">USD</option>
					</select>
				</div>
			</div>

			<div class="flex flex-col">
				<label class="text-sm font-medium text-gray-600">{{ $t("Date & Time") }}</label>
				<input
					v-model="formattedDate"
					type="datetime-local"
					class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					@change="updateDate($event)"
				/>
			</div>

			<div class="flex flex-col">
				<label class="text-sm font-medium text-gray-600">{{ $t("Website") }}</label>
				<input
					v-model="event.website"
					class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					:placeholder="$t('Enter website')"
				/>
			</div>

			<div class="flex flex-col">
				<label class="text-sm font-medium text-gray-600">{{ $t("Venue") }}</label>
				<select
					v-model="event.venue!.venueId"
					class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
				>
					<option disabled selected value="">{{ $t("Choose a venue...") }}</option>
					<option v-for="venue in venues" :key="venue.venueId" :value="venue.venueId">
						{{ venue.name + (venue.address?.city ? " - " + venue.address.city : "") }}
					</option>
				</select>
			</div>

			<div class="flex flex-col">
				<label class="text-sm font-medium text-gray-600">{{ $t("Image URL") }}</label>
				<input
					v-model="event.imageUrl"
					class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					:placeholder="$t('Enter image URL')"
				/>
			</div>

			<div class="flex flex-col">
				<label class="text-sm font-medium text-gray-600">{{ $t("Artist") }}</label>
				<select
					v-model="selectedArtist"
					class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
				>
					<option disabled selected value="">{{ $t("Choose an artist...") }}</option>
					<option
						v-for="artist in artists.filter(
							(art) => !event.artists?.map((art) => art.artistId).includes(art.artistId)
						)"
						:key="artist.artistId"
						:value="artist"
						@click="
							() => {
								event.artists?.push(artist);
								selectedArtist = '';
							}
						"
					>
						{{ artist.name }}
					</option>
				</select>

				<ul class="flex flex-wrap gap-2 mt-4">
					<li
						v-for="artist in event.artists"
						:key="artist.artistId"
						class="flex items-center bg-gray-200 text-gray-800 text-md font-medium px-3 py-1 rounded-full"
					>
						{{ artist.name }}
						<button
							class="ml-2 text-gray-600 hover:text-gray-800"
							@click="event.artists = event.artists!.filter((a) => a.artistId !== artist.artistId)"
						>
							&times;
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
