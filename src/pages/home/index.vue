<script lang="ts">
export default {
	name: "Home",
};
</script>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import PageLoading from "@/components/PageLoading/index.vue";
const ArticleChartCard = defineAsyncComponent({
	loader: () => import("./components/ArticleChartCard/index.vue"),
	loadingComponent: PageLoading,
});
const WorksChartCard = defineAsyncComponent({
	loader: () => import("./components/WorksChartCard/index.vue"),
	loadingComponent: PageLoading,
});
const TopicsChartCard = defineAsyncComponent({
	loader: () => import("./components/TopicsChartCard/index.vue"),
	loadingComponent: PageLoading,
});
const LinksChartCard = defineAsyncComponent({
	loader: () => import("./components/LinksChartCard/index.vue"),
	loadingComponent: PageLoading,
});
</script>

<template>
	<el-row :gutter="24">
		<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" class="margin-b16">
			<ArticleChartCard />
		</el-col>
		<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" class="margin-b16">
			<WorksChartCard />
		</el-col>
		<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" class="margin-b16">
			<TopicsChartCard />
		</el-col>
		<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" class="margin-b16">
			<LinksChartCard />
		</el-col>
	</el-row>
</template>

<style scoped lang="scss"></style>
