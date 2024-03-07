<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";

import { IResponseData } from "@/@types/utils.request";
import { IWorksChartData } from "./data";

import { weeknewWorks } from "./service";
// 数据
const visitData = reactive<IWorksChartData>({
	connectedUsersCount: 0,
});

const loading = ref<boolean>(true);
let timer: any = null;

const getData = async () => {
	const response: IResponseData<any> = await weeknewWorks();
	const { data } = response;
	visitData.connectedUsersCount = data.connectedUsersCount || 0;
	loading.value = false;
};

onMounted(() => {
	getData();
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
	timer = setInterval(() => {
		getData();
	}, 5000);
});

onUnmounted(() => {
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
});
</script>
<template>
	<el-card shadow="never" class="homeBoxCard" v-loading="loading">
		<template #header>
			<span>在线用户</span>
			<el-tag type="success" class="float-right">总</el-tag>
		</template>

		<div class="num">{{ visitData.connectedUsersCount.toLocaleString() }}</div>

		<div class="height40" ref="chartRef" />

		<el-divider />

		<el-row>
			<div style="height: 22px"></div>
		</el-row>
	</el-card>
</template>
<style lang="scss" scoped>
.homeBoxCard {
	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
	::v-deep(.el-card__header) {
		padding-right: 12px;
		padding-left: 12px;
	}

	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
	::v-deep(.el-card__body) {
		padding: 12px;
		font-size: 14px;
		line-height: 1.5715;
	}

	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
	::v-deep(.el-divider) {
		margin: 8px 0;
	}
	.num {
		font-size: 30px;
		color: #515a6e;
	}
	.height40 {
		height: 40px;
	}
}
</style>
