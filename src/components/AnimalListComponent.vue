<script setup lang="ts">
import { getAnimals } from "@/services/animalService";
import { type animalType } from "@/utility/types";

const animals: animalType[] = await getAnimals();
</script>

<template>
	<div>
		<div class="w-full h-full flex justify-center items-center gap-8">
			<RouterLink
				v-for="animal in animals"
				:key="animal.animalId"
				:to="'/animal/' + animal.animalId + '/' + animal.name"
			>
				<div
					class="w-56 h-56 flex flex-col justify-end items-stretch shadow-2xl shadow-black rounded-2xl overflow-hidden bg-[url('https://picsum.photos/300/300')]"
				>
					<p class="bg-white text-center text-2xl pb-2">{{ animal.name }}</p>
				</div>
			</RouterLink>
		</div>
	</div>
</template>

<style scoped></style>
