<script setup lang="ts">
import { getEnclosures } from "@/services/enclosureService";
import { type enclosureType } from "@/utility/types";

const enclosures: enclosureType[] = await getEnclosures();
</script>

<template>
	<div>
		<div class="w-full h-full flex justify-center items-center gap-8">
			<RouterLink
				v-for="enclosure in enclosures"
				:key="enclosure.enclosureId"
				:to="'/enclosure/' + enclosure.enclosureId + '/' + enclosure.name"
			>
				<div
					class="w-56 h-56 flex flex-col justify-end items-stretch shadow-2xl shadow-black rounded-2xl overflow-hidden bg-[url('https://picsum.photos/300/300')]"
				>
					<p class="bg-white text-center text-2xl pb-2">{{ enclosure.name }}</p>
				</div>
			</RouterLink>
		</div>
	</div>
</template>

<style scoped></style>
