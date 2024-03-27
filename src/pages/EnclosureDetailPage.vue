<script setup lang="ts">
import { useRoute } from "vue-router";
import EnclosureDetailComponent from "@/components/EnclosureDetailComponent.vue";

const params = useRoute().params;
const enclosureId = params.enclosureId as string;
</script>

<template>
	<div>
		<suspense>
			<EnclosureDetailComponent :enclosure-id="enclosureId"></EnclosureDetailComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
