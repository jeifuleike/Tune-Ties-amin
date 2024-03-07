<script setup lang="ts">
import { onMounted, ref } from "vue";
import { annualnewLinks } from "./service";

const matchingArr = ref<any>([]);

const chatRoomArr = ref<any>([]);

const getData = async () => {
	const { data } = await annualnewLinks();
	console.log(data);
	matchingArr.value = data.matchingArr;
	chatRoomArr.value = data.chatRoomArr;
};

onMounted(() => {
	getData();
});
</script>

<template>
	<div class="main">
		<h4 class="topTxt">匹配中用户</h4>
		<el-card shadow="never" style="height: 47%; margin-top: 10px; overflow: auto; overflow-y: scroll">
			<el-collapse>
				<template v-if="matchingArr.length">
					<el-collapse-item
						v-for="item in matchingArr"
						:key="item.roomId"
						:title="'房间：' + item.roomId"
						:name="item.roomId"
					>
						<div class="userInfo" v-for="user in item.usersInfo" :key="user.id">
							<img :src="user.avatar" />
							<span>{{ user.userName }}</span>
						</div>
					</el-collapse-item>
				</template>
				<el-empty v-else description="暂无用户" />
			</el-collapse>
		</el-card>
		<h4 class="buttonTxt">在聊天室中用户</h4>
		<el-card shadow="never" style="height: 47%; margin-top: 10px; overflow: auto; overflow-y: scroll">
			<el-collapse>
				<template v-if="chatRoomArr.length">
					<el-collapse-item
						v-for="item in chatRoomArr"
						:key="item.roomId"
						:title="'房间：' + item.roomId"
						:name="item.roomId"
					>
						<div class="userInfo" v-for="user in item.usersInfo" :key="user.id">
							<img :src="user.avatar" />
							<span>{{ user.userName }}</span>
						</div>
					</el-collapse-item>
				</template>
				<el-empty v-else description="暂无用户" />
			</el-collapse>
		</el-card>
	</div>
</template>

<style scoped lang="scss">
.cell {
	line-height: 30px;
}
.main {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
}
.cardClass {
	height: 100%;
	overflow: hidden;
	overflow-y: scroll;
}
.topTxt {
	position: absolute;
	top: -30px;
	left: 0;
}
.buttonTxt {
	position: absolute;
	top: 48%;
	left: 0;
}
.userInfo {
	display: flex;
	flex-direction: column;
	align-items: center;
	float: left;
	margin-left: 10px;
	img {
		width: 50px;
		height: 50px;
	}
}
</style>
