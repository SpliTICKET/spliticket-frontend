<script setup lang="ts">
import type { splitType } from "@/utility/types";
import { getSplits, postSplit } from "@/services/splitService";
import ModalComponent from "@/components/ModalComponent.vue";
import SplitEditComponent from "@/components/splits/SplitEditComponent.vue";
import { computed, type Ref, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.state.auth.user);

const splits: Ref<splitType[]> = ref(await getSplits());

const newSplit: Ref<splitType> = ref({
	event: {
		eventId: "",
	},
	splitParticipants: [
		{
			name: `${user.value?.firstName} ${user.value?.lastName}`,
			hasPaid: true,
		},
	],
});

const isModalOpened = ref(false);

const openModal = () => {
	isModalOpened.value = true;
};
const closeModal = async () => {
	isModalOpened.value = false;
};

const saveSplit = async () => {
	try {
		await postSplit(newSplit.value);
		splits.value = await getSplits();
	} catch (exception) {
		// TODO Error-Handling
	} finally {
		isModalOpened.value = false;
	}
};
</script>

<template>
	<div class="w-full flex flex-wrap justify-center items-center gap-8 p-24">
		<RouterLink v-for="split in splits" :key="split.splitId" :to="'/split/' + split.splitId">
			<div
				class="w-56 h-56 flex flex-col justify-end items-stretch shadow-2xl shadow-black rounded-2xl overflow-hidden bg-[url('https://www.eventim.de/obj/media/DE-eventim/teaser/artworks/2024/ice-nine-kills-tickets-header.jpg')]"
			>
				<p class="bg-white text-center text-2xl pb-2">{{ split.event!.name }}</p>
			</div>
		</RouterLink>

		<div
			class="w-56 h-56 flex flex-col justify-end items-stretch shadow-2xl shadow-black rounded-2xl overflow-hidden"
			@click="openModal"
		>
			<h1>ADD</h1>
		</div>
		<ModalComponent :is-open="isModalOpened" name="first-modal" @click-outside="closeModal">
			<template #content>
				<Suspense>
					<SplitEditComponent :split="newSplit"></SplitEditComponent>
				</Suspense>
				<div class="w-full flex justify-evenly">
					<button @click="closeModal">
						{{ $t("Close") }}
					</button>
					<button @click="saveSplit">{{ $t("Save") }}</button>
				</div>
			</template>
		</ModalComponent>
	</div>
</template>

<style scoped></style>
