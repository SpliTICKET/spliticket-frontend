<script lang="ts" setup>
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { getEvent, patchEvent } from "@/services/eventService";
import EventEditComponent from "@/components/events/EventEditComponent.vue";
import EventBannerComponent from "@/components/events/EventBannerComponent.vue";

const props = defineProps<{
	eventId: string;
}>();

const event = ref(await getEvent(props.eventId));
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
	<div class="w-full h-full flex flex-col items-center justify-start mb-10">
		<div
			class="flex flex-col justify-center items-center gap-4 m-10 rounded-2xl shadow-gray-600 shadow-2xl p-4 lg:w-2/3"
		>
			<EventBannerComponent :event="event"></EventBannerComponent>

			<div class="w-10/12 border-b-2 border-gray-200 dark:border-gray-700" />
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
