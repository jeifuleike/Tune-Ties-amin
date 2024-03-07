<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";

import { IResponseData } from "@/@types/utils.request";
import { IWorksChartData } from "./data";
import { monthnewTopics } from "./service";

// 数据
const visitData = reactive<IWorksChartData>({
	usersCount: 0,
	matchingCounts: 0,
});

let timer: any = null;

// 读取数据
const loading = ref<boolean>(true);
const getData = async () => {
	const response: IResponseData<any> = await monthnewTopics();
	const { data } = response;
	visitData.usersCount = data.usersCount || 0;
	visitData.matchingCounts = data.matchingCounts || 0;
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
			<span>音乐匹配用户</span>
		</template>

		<div class="num">{{ visitData.usersCount }}</div>

		<div class="height40" ref="chartRef" />

		<el-divider />

		<el-row>
			<el-col :span="12">匹配中用户：{{ visitData.matchingCounts }}</el-col>
			<el-col :span="12">在线聊天用户： {{ visitData.usersCount - visitData.matchingCounts }} </el-col>
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
