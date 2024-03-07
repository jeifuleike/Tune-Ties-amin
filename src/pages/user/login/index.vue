<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import IconSvg from "@/components/IconSvg/index.vue";
import { setToken } from "@/utils/localToken";
import { IResponseData } from "@/@types/utils.request";
import { registerParamsType } from "./data";
import { accountLogin, accountRegister } from "./server";
const router = useRouter();

const formRef = ref<FormInstance>();
const formData = reactive<registerParamsType>({
	userName: "",
	password: "",
	aminKey: "",
});
const rules = reactive<FormRules>({
	userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const loading = ref(false);
const aminRegister = ref(false);
const onSubmit = async () => {
	if (loading.value === true) {
		return;
	}
	loading.value = true;
	try {
		const valid: boolean | undefined = await formRef.value?.validate();
		if (valid === true) {
			const response: IResponseData<any> = aminRegister.value
				? await accountRegister(formData)
				: await accountLogin({
						userName: formData.userName,
						password: formData.password,
				  });
			const data = response.data || {};
			setToken(data.token || "");
			ElMessage.success("登录成功");
			const { redirect, ...query } = router.currentRoute.value.query;
			router.replace({
				path: (redirect as string) || "/",
				query: {
					...query,
				},
			});
		}
	} catch (error: any) {
		console.log(error);
		const message = error.message;
		if (message === "CustomError") {
			const response = error.response || {};
			const data = response.data || {};
			const msg = data.msg || "";
			ElMessage.error(msg);
		} else {
			// alert(message);
			ElMessage.warning("验证不通过，请检查输入");
		}
	}
	loading.value = false;
};
</script>

<template>
	<div class="user-login">
		<el-form ref="formRef" :model="formData" :rules="rules">
			<div class="title">
				<div>{{ aminRegister ? "注册管理员" : "登录到" }}</div>
				<div>音乐找友系统管理后台</div>
			</div>
			<div class="item">
				<el-form-item prop="username">
					<el-input placeholder="用户名：" v-model="formData.userName" clearable @keydown.enter="onSubmit">
						<template #prefix>
							<IconSvg name="user" />
						</template>
					</el-input>
				</el-form-item>
			</div>
			<div class="item">
				<el-form-item prop="password">
					<el-input
						placeholder="密码："
						type="password"
						v-model="formData.password"
						clearable
						@keydown.enter="onSubmit"
					>
						<template #prefix>
							<IconSvg name="pwd" />
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password" v-show="aminRegister">
					<el-input placeholder="邀请码：" v-model="formData.aminKey" clearable @keydown.enter="onSubmit">
						<template #prefix>
							<IconSvg name="pwd" />
						</template>
					</el-input>
				</el-form-item>
			</div>
			<el-checkbox
				class="item2"
				v-model="aminRegister"
				:label="aminRegister ? '切换到登录' : '切换到管理员注册'"
				size="large"
			/>
			<div class="item">
				<el-button @click="onSubmit" :loading="loading" class="width100" type="primary">提交</el-button>
			</div>
		</el-form>
	</div>
</template>

<style scoped lang="scss">
.user-login {
	width: 380px;
	padding-bottom: 40px;
	.title {
		padding: 0 20px 20px;
		font-size: 30px;
		line-height: 50px;
	}
	.item {
		padding: 5px 20px;
		.width100 {
			box-sizing: border-box;
			width: 100%;
		}
	}
	.item2 {
		padding: 0 20px;
		font-size: 12px;
	}
}
</style>
