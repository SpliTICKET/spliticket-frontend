<script lang="ts">
export default {
	name: "BreadcrumbsComponent",
	data() {
		return {
			breadcrumbList: [],
		} as { breadcrumbList: { name: string; link: string }[] };
	},
	watch: {
		$route() {
			this.updateList();
		},
	},
	mounted() {
		this.updateList();
	},
	methods: {
		routeTo(pRouteTo: number): void {
			if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link);
		},
		updateList() {
			const breadcrumbs: { name: string; link: string }[] = this.$route.meta.breadcrumb as {
				name: string;
				link: string;
			}[];

			this.breadcrumbList = breadcrumbs;

			const lastBreadCrumb = [...(breadcrumbs || [""]).slice(-1)][0];

			if (lastBreadCrumb) {
				const suffix = lastBreadCrumb.name.startsWith(":")
					? this.$route.params[lastBreadCrumb.name.split(":")[1]]
					: this.$t(lastBreadCrumb.name.toLowerCase());

				document.title = `SpliTICKET | ${suffix}`;
			} else {
				document.title = "SpliTICKET";
			}
		},
	},
};
</script>

<template>
	<div class="py-3 px-5">
		<ul class="flex flex-row gap-1 select-none">
			<li
				v-for="(breadcrumb, idx) in breadcrumbList"
				:key="idx"
				class="flex gap-1"
				:class="{ 'text-green-900 cursor-pointer': !!breadcrumb.link }"
				@click="routeTo(idx)"
			>
				<span>
					{{
						breadcrumb.name.startsWith(":")
							? $route.params[breadcrumb.name.split(":")[1]]
							: $t(breadcrumb.name.toLowerCase())
					}}
				</span>
				<span v-if="!!breadcrumb.link">></span>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
