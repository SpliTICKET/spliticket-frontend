<script setup lang="ts">
import AnimalDetailComponent from "@/components/AnimalDetailComponent.vue";
import { useRoute } from "vue-router";

const params = useRoute().params;
const animalId = params.animalId as string;
</script>

<template>
	<div>
		<suspense>
			<AnimalDetailComponent :animal-id="animalId"></AnimalDetailComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
