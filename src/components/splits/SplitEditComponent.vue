<script lang="ts" setup>
import type { eventType, splitType } from "@/types";
import { getEvents } from "@/services/eventService";

defineProps<{
	split: splitType;
}>();

const events: eventType[] = await getEvents();
</script>

<template>
	<div class="flex flex-col justify-center items-center gap-2">
		<h1 class="text-2xl">{{ split.splitId ? $t("Edit Split") : $t("Create Split") }}</h1>

		<div>
			<select v-model="split.event!.eventId" class="genericSelect" :disabled="!!split.splitId">
				<option disabled selected value="">{{ $t("Choose an event...") }}</option>
				<option v-for="event in events" :key="event.eventId" :value="event.eventId">
					{{ event.name + $d(new Date(event.date!), "short") }}
				</option>
			</select>
		</div>

		<table
			class="border-4 border-green-700 overflow-hidden rounded-2xl bg-green-700 border-separate border-spacing-0 text-center"
		>
			<thead>
				<tr class="h-7 text-white">
					<th class="w-8/12">{{ $t("Name") }}</th>
					<th class="w-2/12">{{ $t("Paid") }}</th>
					<th class="w-2/12"></th>
				</tr>
			</thead>
			<tbody class="bg-white dark:bg-gray-700">
				<tr v-for="(splitParticipant, i) in split.splitParticipants!.filter(() => true)" :key="i">
					<td class="h-7">
						<input v-model="splitParticipant.name" type="text" class="dark:bg-gray-700" />
					</td>
					<td class="bg-opacity-70 flex justify-center">
						<select v-model="splitParticipant.hasPaid">
							<option :value="true">{{ $t("Yes") }}</option>
							<option :value="false">{{ $t("No") }}</option>
						</select>
					</td>
					<td>
						<button @click="() => split.splitParticipants!.splice(i, 1)">
							{{ $t("Delete") }}
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<button class="genericButton mb-4" @click="() => split.splitParticipants!.push({ name: '', hasPaid: false })">
			{{ $t("Add") }}
		</button>
	</div>
</template>

<style scoped></style>
