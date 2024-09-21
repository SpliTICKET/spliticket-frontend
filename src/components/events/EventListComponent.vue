<script lang="ts" setup>
import type { eventType } from "@/types";
import ModalComponent from "@/components/ModalComponent.vue";
import { type Ref, ref } from "vue";
import { getEvents, postEvent } from "@/services/eventService";
import EventEditComponent from "@/components/events/EventEditComponent.vue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import CardComponent from "@/components/CardComponent.vue";

const events: Ref<eventType[]> = ref(await getEvents());

const newEvent: Ref<eventType> = ref({
	price: "",
	name: "",
	website: "",
	venue: {
		venueId: "",
	},
});

const isModalOpened = ref(false);

const openModal = () => {
	isModalOpened.value = true;
};
const closeModal = async () => {
	isModalOpened.value = false;
};
const saveEvent = async () => {
	try {
		await postEvent(newEvent.value);
		newEvent.value = {
			price: "",
			name: "",
			website: "",
			venue: {
				venueId: "",
			},
		};
		events.value = await getEvents();
	} catch (exception) {
		// TODO Error-Handling
	} finally {
		isModalOpened.value = false;
	}
};
</script>

<template>
	<div class="w-full flex flex-wrap justify-center items-center gap-8 p-24">
		<CardComponent
			v-for="event in events"
			:key="event.eventId"
			:label="event.name!"
			:to="'/event/' + event.eventId"
			:image-url="event.imageUrl"
		></CardComponent>

		<div class="listCircle" @click="openModal">
			<FontAwesomeIcon :icon="faPlus" size="3x"></FontAwesomeIcon>
		</div>
		<ModalComponent :is-open="isModalOpened" @click-outside="closeModal">
			<template #content>
				<Suspense>
					<EventEditComponent :event="newEvent"></EventEditComponent>
				</Suspense>
				<div class="w-full flex justify-evenly">
					<button @click="closeModal">
						{{ $t("Close") }}
					</button>
					<button @click="saveEvent">{{ $t("Save") }}</button>
				</div>
			</template>
		</ModalComponent>
	</div>
</template>

<style scoped></style>
