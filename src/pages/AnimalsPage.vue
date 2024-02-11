<script setup lang="ts">
import AnimalListComponent from "@/components/AnimalListComponent.vue";
</script>

<template>
	<div>
		<h1 class="text-5xl text-center mb-10">{{ $t("animals") }}</h1>
		<suspense>
			<AnimalListComponent></AnimalListComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
