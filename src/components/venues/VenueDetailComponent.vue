<script lang="ts" setup>
import { getVenue, patchVenue } from "@/services/venueService";
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import VenueEditComponent from "@/components/venues/VenueEditComponent.vue";

const props = defineProps<{
	venueId: string;
}>();

const venue = ref(await getVenue(props.venueId));

const isModalOpened = ref(false);

const openModal = () => {
	isModalOpened.value = true;
};

const closeModal = async () => {
	venue.value = await getVenue(props.venueId);
	isModalOpened.value = false;
};

const saveVenue = async () => {
	venue.value = await patchVenue(props.venueId, venue.value);
	isModalOpened.value = false;
};
</script>

<template>
	<div class="w-full h-full">
		<div class="flex flex-col justify-center items-center gap-4 m-10 rounded-2xl shadow-gray-600 shadow-2xl p-4">
			<div class="relative w-full">
				<div class="absolute inset-0 w-1/2 flex flex-col justify-center items-center gap-8 text-gray-200 p-10">
					<h1 class="text-2xl">{{ venue.name }}</h1>
					<div class="flex flex-col items-center gap-2">
						<a :href="venue.website" target="_blank">{{ venue.name }}</a>
						<!--						<a :href="'https://www.google.de/maps/place/' + addressString" target="_blank">{{
							addressString
						}}</a>-->
					</div>
				</div>
			</div>

			<div class="w-10/12 border-b-2 border-gray-200 dark:border-gray-700" />
			<button @click="openModal">Bearbeiten</button>

			<ModalComponent :is-open="isModalOpened" name="first-modal" @click-outside="closeModal">
				<template #content>
					<Suspense>
						<VenueEditComponent :venue="venue"></VenueEditComponent>
					</Suspense>
					<div class="w-full flex justify-evenly">
						<button @click="closeModal">
							{{ $t("Close") }}
						</button>
						<button @click="saveVenue">{{ $t("Save") }}</button>
					</div>
				</template>
			</ModalComponent>
		</div>
	</div>
</template>

<style scoped></style>
