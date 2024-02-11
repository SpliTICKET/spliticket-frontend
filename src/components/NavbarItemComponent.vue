<script setup lang="ts">
interface NavbarItemProps {
	pageName: string;
}

withDefaults(defineProps<NavbarItemProps>(), {
	pageName: "home",
});
</script>

<template>
	<RouterLink :to="{ name: pageName }">
		{{ $t(pageName.toLowerCase()) }}
	</RouterLink>
</template>

<style scoped></style>
