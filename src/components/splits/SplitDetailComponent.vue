<script lang="ts" setup>
import { getSplit, patchSplit, postSplitParticipant } from "@/services/splitService";
import IconTick from "@/components/icons/IconTick.vue";
import IconCross from "@/components/icons/IconCross.vue";
import { useStore } from "vuex";
import { computed, type Ref, ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import SplitEditComponent from "@/components/splits/SplitEditComponent.vue";
import type { splitParticipantType, userType } from "@/types";

const props = defineProps<{
	splitId: string;
}>();

const split = ref(await getSplit(props.splitId));
const address = split.value.event!.venue!.address!;
const addressString = `${address.street} ${address.houseNumber}, ${address.postalCode} ${address.city}, ${address.country}`;

const store = useStore();
const user: Ref<userType> = computed(() => store.state.auth.user || { username: "" });

const isModalOpened = ref(false);
const newParticipantName = ref(user.value ? user.value!.firstName : "");

const openModal = () => {
	isModalOpened.value = true;
};

const closeModal = async () => {
	split.value = await getSplit(props.splitId);
	isModalOpened.value = false;
};

const saveSplit = async () => {
	split.value = await patchSplit(props.splitId, split.value);
	isModalOpened.value = false;
};

const addSplitParticipant = async () => {
	if (newParticipantName.value?.trim().length === 0) return;

	const newSplitParticipant: splitParticipantType = {
		name: newParticipantName.value!.trim(),
	};

	await postSplitParticipant(props.splitId, newSplitParticipant);
	newParticipantName.value = "";
	await closeModal();
};
</script>

<template>
	<div class="w-full h-full">
		<div class="flex flex-col justify-center items-center gap-4 m-10 rounded-2xl shadow-gray-600 shadow-2xl p-4">
			<div class="relative w-full">
				<img :src="split.event?.imageUrl" alt="Background Image" class="w-full h-auto rounded-xl" />

				<div class="absolute inset-0 w-1/2 flex flex-col justify-center items-center gap-8 text-gray-200 p-10">
					<h1 class="text-2xl">{{ split.event!.name }}</h1>
					<div class="flex flex-col items-center gap-2">
						<a :href="split.event!.venue!.website" target="_blank">{{ split.event!.venue!.name }}</a>
						<a :href="'https://www.google.de/maps/place/' + addressString" target="_blank">{{
							addressString
						}}</a>
						<p>{{ split.event!.price }}</p>
					</div>
				</div>
			</div>

			<div class="w-10/12 border-b-2 border-gray-200 dark:border-gray-700" />
			<div class="w-full flex justify-center">
				<table
					class="w-3/6 border-4 border-green-700 rounded-2xl bg-green-700 border-separate border-spacing-0 text-center"
				>
					<thead>
						<tr class="h-7">
							<th>{{ $t("Name") }}</th>
							<th>{{ $t("Paid") }}</th>
						</tr>
					</thead>
					<tbody class="bg-white dark:bg-gray-700">
						<tr v-for="participant in split.splitParticipants" :key="participant.splitParticipantId">
							<td class="h-7">
								{{ participant.name }}
							</td>
							<td
								:class="participant.hasPaid ? 'bg-green-700' : 'bg-red-700'"
								class="bg-opacity-70 h-7 flex justify-center"
							>
								<IconTick v-if="participant.hasPaid" class="text-green-900" />
								<IconCross v-else class="text-red-900" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-if="split.owner!.username === user.username">
				<button @click="openModal">Bearbeiten</button>
			</div>
			<div v-else class="flex gap-1">
				<input v-model="newParticipantName" placeholder="John Doe" />
				<button class="genericButton" @click="addSplitParticipant()">Setz mich auf die Liste!</button>
			</div>

			<ModalComponent :is-open="isModalOpened" name="first-modal" @click-outside="closeModal">
				<template #content>
					<Suspense>
						<SplitEditComponent :split="split"></SplitEditComponent>
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
	</div>
</template>

<style scoped></style>
