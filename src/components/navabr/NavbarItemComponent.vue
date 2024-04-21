<script setup lang="ts">
interface NavbarItemProps {
	to: string;
	label: string;
}

withDefaults(defineProps<NavbarItemProps>(), {
	to: "Home",
	label: "Home",
});
</script>

<template>
	<RouterLink :to="{ name: to }">
		{{ label }}
	</RouterLink>
</template>

<style scoped></style>
