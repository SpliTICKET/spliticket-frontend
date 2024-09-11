<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";

interface NavbarItemProps {
	to: string;
	label: string;
}

const props = withDefaults(defineProps<NavbarItemProps>(), {
	to: "Home",
	label: "Home",
});
</script>

<template>
	<RouterLink
		:class="{
			selected:
				useRouter()
					.getRoutes()
					.find((route) => route.name === props.to)?.path === useRoute().fullPath,
		}"
		:to="{ name: to }"
		class="text-black hover:text-white transition-all duration-200 origin-bottom"
	>
		{{ label }}
	</RouterLink>
</template>

<style scoped>
.selected {
	@apply text-white;
}
</style>
