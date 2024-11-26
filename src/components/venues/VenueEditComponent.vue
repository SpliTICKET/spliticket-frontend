<script lang="ts" setup>
import type { venueType } from "@/types";
import { toRefs } from "vue";

const props = defineProps<{
	venue: venueType;
}>();

const { venue } = toRefs(props);
</script>

<template>
	<div class="flex flex-col justify-center items-center gap-2">
		<h1 class="text-2xl">{{ venue.venueId ? $t("Edit Venue") : $t("Create Venue") }}</h1>
		<div class="w-96">
			<label>
				{{ $t("Name") }}
				<input v-model="venue.name" :placeholder="$t('Enter venue name')" />
			</label>
			<div v-if="venue.address" class="flex flex-col">
				<label>
					{{ $t("Street") }}
					<input v-model="venue.address!.street" :placeholder="$t('Enter street')" />
				</label>
				<label>
					{{ $t("HouseNumber") }}
					<input v-model="venue.address!.houseNumber" :placeholder="$t('Enter houseNumber')" />
				</label>
				<label>
					{{ $t("City") }}
					<input v-model="venue.address!.city" :placeholder="$t('Enter city')" />
				</label>
				<label>
					{{ $t("PostalCode") }}
					<input v-model="venue.address!.postalCode" :placeholder="$t('Enter postalCode')" />
				</label>
				<label>
					{{ $t("Country") }}
					<input v-model="venue.address!.country" :placeholder="$t('Enter country')" />
				</label>
			</div>
			<label>
				{{ $t("Website") }}
				<input v-model="venue.website" :placeholder="$t('Enter website')" />
			</label>
		</div>
	</div>
</template>

<style scoped></style>
