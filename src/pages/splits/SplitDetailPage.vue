<script setup lang="ts">
import { useRoute } from "vue-router";
import SplitDetailComponent from "@/components/splits/SplitDetailComponent.vue";

const params = useRoute().params;
const splitId = params.splitId as string;
</script>

<template>
	<div>
		<suspense>
			<SplitDetailComponent :split-id="splitId"></SplitDetailComponent>
		</suspense>
	</div>
</template>

<style scoped></style>
