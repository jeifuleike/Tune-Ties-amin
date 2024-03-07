<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";

import { IResponseData } from "@/@types/utils.request";
import { IArticleChartData } from "./data";
import { dailynewArticles } from "./service";

// 数据
const visitData = reactive<IArticleChartData>({
	allUserCount: 0,
	amidUserCount: 0,
	userCount: 0,
});

let timer: any = null;

// 读取数据
const loading = ref<boolean>(true);
const getData = async () => {
	const response: IResponseData<any> = await dailynewArticles();
	const { data } = response;
	visitData.allUserCount = data.allUserCount || 0;
	visitData.amidUserCount = data.amidUserCount || 0;
	visitData.userCount = data.userCount || 0;
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
			<span>注册用户数</span>
			<el-tag class="float-right">总</el-tag>
		</template>

		<div class="num">{{ visitData.allUserCount.toLocaleString() }}</div>

		<div class="height40">
			<div class="articleText"></div>
		</div>

		<el-divider />

		<el-row>
			<el-col :span="12">用户数：{{ visitData.userCount.toLocaleString() }}</el-col>
			<el-col :span="12">管理员数： {{ visitData.amidUserCount.toLocaleString() }} </el-col>
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
	.articleText {
		padding-top: 20px;
	}
	.color19be6b {
		color: #19be6b;
	}
	.colored4014 {
		color: #ed4014;
	}
}
</style>
