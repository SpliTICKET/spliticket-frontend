<script setup lang="ts">
import NavbarComponent from "@/components/navabr/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
	<div class="flex flex-col w-full h-full justify-between">
		<NavbarComponent></NavbarComponent>
		<RouterView class="text-text-normal top-14 bottom-8 left-0 right-0 absolute overflow-y-scroll"></RouterView>
		<FooterComponent></FooterComponent>
	</div>
</template>

<style scoped></style>
