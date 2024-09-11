<script lang="ts" setup>
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { getEvent, patchEvent } from "@/services/eventService";
import EventEditComponent from "@/components/events/EventEditComponent.vue";

const props = defineProps<{
	eventId: string;
}>();

const event = ref(await getEvent(props.eventId));
const address = event.value.venue!.address!;
const addressString = `${address.street} ${address.houseNumber}, ${address.postalCode} ${address.city}, ${address.country}`;

const isModalOpened = ref(false);

const openModal = () => {
	isModalOpened.value = true;
};
const closeModal = async () => {
	event.value = await getEvent(props.eventId);
	isModalOpened.value = false;
};

const saveEvent = async () => {
	event.value = await patchEvent(props.eventId, event.value);
	isModalOpened.value = false;
};
</script>

<template>
	<div class="w-full h-full">
		<div class="flex flex-col justify-center items-center gap-4 m-10 rounded-2xl shadow-gray-600 shadow-2xl p-4">
			<div class="w-full flex flex-col items-center gap-8">
				<h1 class="text-2xl">{{ event.name }}</h1>
				<div class="flex flex-col items-center gap-2">
					<a :href="event.venue!.website" target="_blank">{{ event.venue!.name }}</a>
					<a :href="'https://www.google.de/maps/place/' + addressString" target="_blank">{{
						addressString
					}}</a>
					<p>{{ event.price }}</p>
				</div>
			</div>
			<div class="w-10/12 border-b-2 border-gray-200" />
			<div class="w-full flex justify-center"></div>

			<button @click="openModal">Bearbeiten</button>

			<ModalComponent :is-open="isModalOpened" name="first-modal" @click-outside="closeModal">
				<template #content>
					<Suspense>
						<EventEditComponent :event="event"></EventEditComponent>
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
	</div>
</template>

<style scoped></style>
