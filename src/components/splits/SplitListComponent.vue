<script lang="ts" setup>
import type { splitType } from "@/types";
import { getSplits, postSplit } from "@/services/splitService";
import ModalComponent from "@/components/ModalComponent.vue";
import SplitEditComponent from "@/components/splits/SplitEditComponent.vue";
import { computed, type Ref, ref } from "vue";
import { useStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CardComponent from "@/components/CardComponent.vue";

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
	<div class="cardList">
		<CardComponent
			v-for="split in splits"
			:key="split.splitId"
			:label="split.event?.name!"
			:to="'/split/' + split.splitId"
			:image-url="split.event?.imageUrl"
			:counter="split.splitParticipants?.length"
		></CardComponent>

		<div class="listCircle" @click="openModal">
			<FontAwesomeIcon :icon="faPlus" size="3x"></FontAwesomeIcon>
		</div>
		<ModalComponent :is-open="isModalOpened" name="first-modal" @click-outside="closeModal">
			<template #content>
				<Suspense>
					<SplitEditComponent :split="newSplit"></SplitEditComponent>
				</Suspense>
				<div class="w-full flex justify-evenly">
					<button class="genericButton bg-red-600" @click="closeModal">
						{{ $t("Close") }}
					</button>
					<button class="genericButton" @click="saveSplit">{{ $t("Save") }}</button>
				</div>
			</template>
		</ModalComponent>
	</div>
</template>

<style scoped></style>
