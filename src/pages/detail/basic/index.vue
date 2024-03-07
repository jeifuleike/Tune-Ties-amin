<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
import { annualnewLinks, changeData } from "./service";
import { ElMessage, ElMessageBox } from "element-plus";

const homeSwitch = reactive<any>({
	search: false,
	HOMEPAGE_BANNER: false,
	HOMEPAGE_BLOCK_PLAYLIST_RCMD: false,
	HOMEPAGE_BLOCK_STYLE_RCMD: false,
	HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG: false,
});

const defHomeSwitch = ref([]);

const getData = async () => {
	const { data } = await annualnewLinks();
	defHomeSwitch.value = data;
	data.forEach((key: any) => {
		homeSwitch[key] = true;
	});
};

const showBtn = computed(() => {
	const data: any = [];
	const keys = Object.keys(homeSwitch);
	keys.forEach((key) => {
		if (homeSwitch[key]) {
			data.push(key);
		}
	});
	return (
		data.length === defHomeSwitch.value.length && data.every((value, index) => value === defHomeSwitch.value[index])
	);
});

onMounted(() => {
	getData();
});

const edit = () => {
	ElMessageBox.confirm("你确定要应用此布局吗", "Warning", {
		confirmButtonText: "是",
		cancelButtonText: "否",
		type: "warning",
	}).then(async () => {
		const data = Object.values(homeSwitch);
		const res = await changeData(data);
		if (res.state) {
			ElMessage.success("提交成功");
		} else {
			ElMessage.error(res.msg);
		}
		getData();
	});
};
</script>

<template>
	<el-card shadow="never">
		<h3>首页详情</h3>
		<transition name="el-fade-in-linear">
			<el-button type="primary" class="editBtn" v-show="!showBtn" @click="edit">编辑</el-button>
		</transition>
		<div class="main">
			<div class="left">
				<el-card class="elCard" shadow="always">
					<h5>搜索</h5>
					<img src="../../../assets/images/search.png" alt="" />
					<el-switch class="elSwitch" v-model="homeSwitch.search" size="large" active-text="开启" />
				</el-card>
				<el-card class="elCard" shadow="always">
					<h5>轮播图</h5>
					<img src="../../../assets/images/banner.png" alt="" />
					<el-switch class="elSwitch" v-model="homeSwitch.HOMEPAGE_BANNER" size="large" active-text="开启" />
				</el-card>
				<el-card class="elCard" shadow="always">
					<h5>推荐歌单</h5>
					<img src="../../../assets/images/HOMEPAGE_BLOCK_PLAYLIST_RCMD.png" alt="" />
					<el-switch
						class="elSwitch"
						v-model="homeSwitch.HOMEPAGE_BLOCK_PLAYLIST_RCMD"
						size="large"
						active-text="开启"
					/>
				</el-card>
				<el-card class="elCard" shadow="always">
					<h5>歌手推荐</h5>
					<img src="../../../assets/images/HOMEPAGE_BLOCK_STYLE_RCMD.png" alt="" />
					<el-switch class="elSwitch" v-model="homeSwitch.HOMEPAGE_BLOCK_STYLE_RCMD" size="large" active-text="开启" />
				</el-card>
				<el-card class="elCard" shadow="always">
					<h5>新歌推荐</h5>
					<img src="../../../assets/images/HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG.png" alt="" />
					<el-switch
						class="elSwitch"
						v-model="homeSwitch.HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG"
						size="large"
						active-text="开启"
					/>
				</el-card>
			</div>
			<div class="right">
				<el-card shadow="always">
					<h5>总体预览</h5>
					<transition name="el-fade-in-linear">
						<div v-show="homeSwitch.search">
							<img src="../../../assets/images/search.png" alt="" />
						</div>
					</transition>
					<transition name="el-fade-in-linear">
						<div v-show="homeSwitch.HOMEPAGE_BANNER">
							<img src="../../../assets/images/banner.png" alt="" />
						</div>
					</transition>
					<transition name="el-fade-in-linear">
						<div v-show="homeSwitch.HOMEPAGE_BLOCK_PLAYLIST_RCMD">
							<img src="../../../assets/images/HOMEPAGE_BLOCK_PLAYLIST_RCMD.png" alt="" />
						</div>
					</transition>
					<transition name="el-fade-in-linear">
						<div v-show="homeSwitch.HOMEPAGE_BLOCK_STYLE_RCMD">
							<img src="../../../assets/images/HOMEPAGE_BLOCK_STYLE_RCMD.png" alt="" />
						</div>
					</transition>
					<transition name="el-fade-in-linear">
						<div v-show="homeSwitch.HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG">
							<img src="../../../assets/images/HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG.png" alt="" />
						</div>
					</transition>
				</el-card>
			</div>
		</div>
	</el-card>
</template>

<style scoped lang="scss">
.editBtn {
	position: absolute;
	top: 2%;
	right: 2%;
}
.main {
	display: flex;
	justify-content: space-between;
	.left {
		width: 49%;
		.elCard {
			position: relative;
			.elSwitch {
				position: absolute;
				top: 5%;
				right: 5%;
			}
		}
	}
	.right {
		width: 49%;
		div {
			display: flex;
			justify-content: center;
		}
	}
}
</style>
