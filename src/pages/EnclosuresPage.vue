<script setup lang="ts">
import EnclosureListComponent from "@/components/EnclosureListComponent.vue";
</script>

<template>
	<div>
		<h1 class="text-5xl text-center mb-10">{{ $t("enclosures") }}</h1>
		<suspense>
			<EnclosureListComponent></EnclosureListComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
