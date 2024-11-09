<script lang="ts" setup>
import { getArtists, postArtist } from "@/services/artistService";
import ModalComponent from "@/components/ModalComponent.vue";
import { ref, type Ref } from "vue";
import type { artistType } from "@/types";
import ArtistEditComponent from "@/components/artists/ArtistEditComponent.vue";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import CardComponent from "@/components/CardComponent.vue";

const artists: Ref<artistType[]> = ref(await getArtists());

const newArtist: Ref<artistType> = ref({
	name: "",
});

const isModalOpened = ref(false);

const openModal = () => {
	isModalOpened.value = true;
};
const closeModal = async () => {
	isModalOpened.value = false;
};

const saveArtist = async () => {
	try {
		await postArtist(newArtist.value);
		artists.value = await getArtists();
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
			v-for="artist in artists"
			:key="artist.artistId"
			:label="artist.name!"
			:to="'/artist/' + artist.artistId"
			:image-url="''"
		></CardComponent>

		<div class="listCircle" @click="openModal">
			<FontAwesomeIcon :icon="faPlus" size="3x"></FontAwesomeIcon>
		</div>
		<ModalComponent :is-open="isModalOpened" name="first-modal" @click-outside="closeModal">
			<template #content>
				<Suspense>
					<ArtistEditComponent :artist="newArtist"></ArtistEditComponent>
				</Suspense>
				<div class="w-full flex justify-evenly">
					<button @click="closeModal">
						{{ $t("Close") }}
					</button>
					<button @click="saveArtist">{{ $t("Save") }}</button>
				</div>
			</template>
		</ModalComponent>
	</div>
</template>

<style scoped></style>
