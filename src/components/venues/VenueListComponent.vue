<script lang="ts" setup>
import type { venueType } from "@/types";
import ModalComponent from "@/components/ModalComponent.vue";
import { type Ref, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CardComponent from "@/components/CardComponent.vue";
import { getVenues, postVenue } from "@/services/venueService";
import VenueEditComponent from "@/components/venues/VenueEditComponent.vue";

const venues: Ref<venueType[]> = ref(await getVenues());

const newVenue: Ref<venueType> = ref({
	name: "",
	address: {
		street: "",
		houseNumber: "",
		city: "",
		postalCode: "",
		country: "",
	},
	events: [],
	website: "",
});

const isModalOpened = ref(false);

const openModal = () => {
	isModalOpened.value = true;
};

const closeModal = async () => {
	isModalOpened.value = false;
};

const saveVenue = async () => {
	try {
		await postVenue(newVenue.value);
		venues.value = await getVenues();
	} catch (exception) {
		// TODO Error-Handling
		console.error(exception);
	} finally {
		isModalOpened.value = false;
	}
};
</script>

<template>
	<div class="cardList">
		<CardComponent
			v-for="venue in venues"
			:key="venue.venueId"
			:label="venue.name!"
			:to="'/venue/' + venue.venueId"
			:image-url="''"
		></CardComponent>

		<div class="listCircle" @click="openModal">
			<FontAwesomeIcon :icon="faPlus" size="3x"></FontAwesomeIcon>
		</div>
		<ModalComponent :is-open="isModalOpened" name="first-modal" @click-outside="closeModal">
			<template #content>
				<Suspense>
					<VenueEditComponent :venue="newVenue"></VenueEditComponent>
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
</template>

<style scoped></style>
