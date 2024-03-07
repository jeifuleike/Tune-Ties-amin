<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";

import { IResponseData } from "@/@types/utils.request";
import { IWorksChartData } from "./data";
import { annualnewLinks } from "./service";

// 数据
const visitData = reactive<IWorksChartData>({
	messageCount: 0,
	friendCount: 0,
});

let timer: any = null;

// 读取数据
const loading = ref<boolean>(true);
const getData = async () => {
	const response: IResponseData<any> = await annualnewLinks();
	const { data } = response;
	visitData.messageCount = data.messageCount || 0;
	visitData.friendCount = data.friendCount || 0;
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
			<span>聊天记录总数</span>
		</template>

		<div class="num">{{ visitData.messageCount.toLocaleString() }}</div>

		<div class="height40" ref="chartRef" />

		<el-divider />

		<el-row>
			<el-col :span="12">互聊房间数</el-col>
			<el-col class="text-align-right" :span="12"> {{ visitData.friendCount.toLocaleString() }} </el-col>
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
