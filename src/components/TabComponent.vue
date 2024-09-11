<script lang="ts" setup>
import { type Component, type Ref, ref } from "vue";

defineProps<{
	tabs: {
		name: string;
		component: Component;
		props: any;
	}[];
}>();

const selectedTab: Ref<number> = ref(0);
</script>

<template>
	<div>
		<ul class="flex flex-row border-green-700">
			<li
				v-for="(tab, i) in tabs"
				:key="i"
				:class="selectedTab === i ? 'selectedTab' : 'notSelectedTab'"
				class="cursor-pointer rounded-t-md px-4 py-0.5 whitespace-nowrap"
				@click="selectedTab = i"
			>
				{{ tab.name }}
			</li>
			<li class="border-2 border-transparent border-b-black w-full"></li>
		</ul>
		<div>
			<component :is="tabs[selectedTab].component" v-bind="tabs[selectedTab].props"></component>
		</div>
	</div>
</template>

<style scoped>
.notSelectedTab {
	@apply hover:text-gray-300 border-b-2 border-transparent border-b-black;
}

.selectedTab {
	@apply border-green-700 border-2 border-b-transparent;
}
</style>
