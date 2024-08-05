<script setup lang="ts">
import { getArtists, postArtist } from "@/services/artistService";
import ModalComponent from "@/components/ModalComponent.vue";
import { ref, type Ref } from "vue";
import type { artistType } from "@/types";
import ArtistEditComponent from "@/components/artists/ArtistEditComponent.vue";

const artists: Ref<artistType[]> = ref(await getArtists());

const newArtist: Ref<artistType> = ref({
	name: "Test",
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
		console.log(newArtist.value);
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
	<div class="w-full flex flex-wrap justify-center items-center gap-8 p-24">
		<RouterLink v-for="artist in artists" :key="artist.artistId" :to="'/artist/' + artist.artistId">
			<div
				class="w-56 h-56 flex flex-col justify-end items-stretch shadow-2xl shadow-black rounded-2xl overflow-hidden bg-[url('https://www.eventim.de/obj/media/DE-eventim/teaser/artworks/2024/ice-nine-kills-tickets-header.jpg')]"
			>
				<p class="bg-white text-center text-2xl pb-2">{{ artist.name }}</p>
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
