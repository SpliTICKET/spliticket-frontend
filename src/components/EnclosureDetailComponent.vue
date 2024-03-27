<script setup lang="ts">
import { getEnclosure } from "@/services/enclosureService";
import type { enclosureType } from "@/utility/types";

const props = defineProps<{
	enclosureId: string;
}>();

const enclosure: enclosureType = await getEnclosure(props.enclosureId);
</script>

<template>
	<div class="w-full px-14 py-7">
		<div class="shadow-2xl shadow-black rounded-2xl border-2 flex flex-row">
			<div class="w-1/2 p-6 flex flex-col gap-4">
				<h1 class="text-4xl font-bold">{{ enclosure.name }}</h1>
				<div
					class="w-full h-96 rounded-xl overflow-hidden bg-center bg-cover bg-[url('https://picsum.photos/640/480')]"
				></div>
				<div>
					<h2 class="text-xl font-bold">{{ $t("size(LxWxH)") }}</h2>
					<h3 class="text-l">{{ enclosure.length }} x {{ enclosure.width }} x {{ enclosure.height }} cm</h3>
				</div>
				{{ enclosure }}
			</div>
			<div class="w-1/2"></div>
		</div>
	</div>
</template>

<style scoped></style>
