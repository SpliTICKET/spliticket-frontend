<script setup lang="ts">
import { getAnimal } from "@/services/animalService";
import type { animalType } from "@/utility/types";
import TabComponent from "@/components/TabComponent.vue";
import EmtptyComponent from "@/components/EmtptyComponent.vue";

const props = defineProps<{
	animalId: string;
}>();

const animal: animalType = await getAnimal(props.animalId);
</script>

<template>
	<div class="w-full px-14 py-7">
		<div class="shadow-2xl shadow-black rounded-2xl border-2 flex flex-row">
			<div class="w-1/2 p-6 flex flex-col gap-4">
				<h1 class="text-4xl font-bold">{{ animal.name }}</h1>
				<div
					class="w-full h-96 rounded-xl overflow-hidden bg-center bg-cover bg-[url('https://picsum.photos/640/480')]"
				></div>
				<div>
					<h2 class="text-xl font-bold">{{ $t("species") }}</h2>
					<h3 class="text-l">{{ animal.species }}</h3>
				</div>
				<div>
					<h2 class="text-xl font-bold">{{ $t("enclosure") }}</h2>
					<RouterLink :to="'/enclosure/' + animal.enclosure?.enclosureId + '/' + animal.enclosure?.name">
						{{ animal.enclosure?.name }}
					</RouterLink>
				</div>
			</div>
			<div class="w-1/2 p-6 flex flex-col gap-4">
				<TabComponent
					:tabs="[
						{ name: 'Test1', component: EmtptyComponent, props: { propName: 'asfgdsdfhsed' } },
						{ name: 'Test2', component: EmtptyComponent, props: { propName: '123123123' } },
					]"
				></TabComponent>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
