<script lang="ts" setup>
import { getSplit, patchSplit, postSplitParticipant } from "@/services/splitService";
import IconTick from "@/components/icons/IconTick.vue";
import IconCross from "@/components/icons/IconCross.vue";
import { useStore } from "vuex";
import { computed, type Ref, ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import SplitEditComponent from "@/components/splits/SplitEditComponent.vue";
import type { splitParticipantType, userType } from "@/types";
import EventBannerComponent from "@/components/events/EventBannerComponent.vue";

const props = defineProps<{
	splitId: string;
}>();

const split = ref(await getSplit(props.splitId));
const store = useStore();
const user: Ref<userType> = computed(() => store.state.auth.user || { username: "" });

const isModalOpened = ref(false);
const newParticipantName = ref(user.value ? user.value!.firstName : "");
const participantAdded = ref(false);

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
	participantAdded.value = true;
	await closeModal();
};
</script>

<template>
	<div class="w-full h-full flex flex-col items-center justify-start mb-10">
		<div
			class="flex flex-col justify-center items-center gap-2 md:gap-4 md:m-10 rounded-2xl md:shadow-gray-600 md:shadow-2xl md:p-4 w-full md:w-2/3"
		>
			<EventBannerComponent v-if="!!split.event" :event="split.event"></EventBannerComponent>

			<div class="w-10/12 border-b-2 border-gray-200 dark:border-gray-700" />
			<div class="w-full flex justify-center p-6 md:p-0">
				<table
					class="w-full md:w-3/6 border-4 border-green-700 overflow-hidden rounded-2xl bg-green-700 border-separate border-spacing-0 text-center"
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
				<button class="genericButton" @click="openModal">Bearbeiten</button>
			</div>
			<div v-else-if="!participantAdded" class="flex flex-col md:flex-row gap-1 mb-10 md:mb-0">
				<input v-model="newParticipantName" placeholder="John Doe" />
				<button class="genericButton" @click="addSplitParticipant()">Setz mich auf die Liste!</button>
			</div>
			<div v-else class="mb-10 md:mb-0 text-green-700">
				<p>Du wurdest erfolgreich zum Split hinzugefügt!</p>
			</div>

			<ModalComponent :is-open="isModalOpened" name="first-modal" @click-outside="closeModal">
				<template #content>
					<Suspense>
						<SplitEditComponent :split="split"></SplitEditComponent>
					</Suspense>
					<div class="flex justify-evenly">
						<button class="genericButton bg-red-700" @click="closeModal">
							{{ $t("Close") }}
						</button>
						<button class="genericButton" @click="saveSplit">{{ $t("Save") }}</button>
					</div>
				</template>
			</ModalComponent>
		</div>
	</div>
</template>

<style scoped></style>
