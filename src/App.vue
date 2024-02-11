<script setup lang="ts">
import NavbarComponent from "@/components/NavbarComponent.vue";
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent.vue";
</script>

<template>
	<NavbarComponent></NavbarComponent>
	<div class="flex flex-col w-full h-full">
		<BreadcrumbsComponent></BreadcrumbsComponent>
		<RouterView class="text-text-normal"></RouterView>
	</div>
</template>

<style scoped></style>
