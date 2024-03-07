<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { ITableData, createdData, editData, createdFinishData, editFinishData } from "./data";
import { ElMessage, FormInstance, FormRules, ElMessageBox } from "element-plus";
import { regionMap } from "./date";
import { queryList, createData, updateData, removeData } from "./service";
import { IResponseData } from "@/@types/utils.request";

const ruleFormRef = ref<FormInstance>();

const table = reactive<ITableData>({
	loading: false,
	list: [],
	pagination: {
		total: 0,
		current: 1,
		pageSize: 7,
	},
});
const getList = async (current: number): Promise<void> => {
	table.loading = true;
	try {
		const response: IResponseData<any> = await queryList({
			per: table.pagination.pageSize,
			page: current,
		});
		const { data } = response;
		table.list = data.users || [];
		table.pagination = {
			...table.pagination,
			total: data.total || 0,
			current,
		};
	} catch (error: any) {
		console.log(error);
	}
	table.loading = false;
};
onMounted(() => {
	getList(1);
});

const finishForm = ref<createdData>({
	userName: "",
	password: "",
	name: "",
	sex: 0,
	passwordTo: "",
	region: [],
});

const createdShow = ref<boolean>(false);
let modalType = ref("created");

const close = () => {
	createdShow.value = false;
};

const createdFinish = async () => {
	try {
		const valid: boolean | undefined = await ruleFormRef.value?.validate();
		if (valid === true) {
			const { userName, password, name, sex, region } = finishForm.value;
			const data: createdFinishData = {
				userName,
				password,
				name,
				sex,
				region: region.join(" "),
			};
			await createData(data);
			createdShow.value = false;
			getList(1);
			ElMessage.success("删除成功");
		}
	} catch (error: any) {
		console.log(error);
		ElMessage.warning("验证不通过，请检查输入");
	}
};

const editFrom = reactive<editData>({
	name: "",
	sex: 0,
	region: [],
});

const editFinish = async () => {
	try {
		const valid: boolean | undefined = await ruleFormRef.value?.validate();
		if (valid === true) {
			const { name, sex, region } = editFrom;
			const data: editFinishData = {
				userName: name,
				sex,
				region: region.join(" "),
			};
			await updateData(editUserInfo.value.id, data);
			createdShow.value = false;
			getList(1);
			ElMessage.success("提交成功");
		}
	} catch (error: any) {
		console.log(error);
		ElMessage.warning("验证不通过，请检查输入");
	}
};

// 添加和编辑弹窗表单验证规则
const rules = reactive<FormRules>({
	userName: [
		{ required: true, message: "请输入账号", trigger: "blur" },
		{ min: 3, max: 20, message: "账号长度2到20个字", trigger: "blur" },
	],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ min: 3, max: 20, message: "密码长度2到20个字", trigger: "blur" },
	],
	passwordTo: [
		{
			validator: (rule: any, value: any, callback: any) => {
				if (value === "") {
					callback(new Error("请输入确认密码"));
				} else if (value !== finishForm.value.password) {
					callback(new Error("两次密码不一致"));
				} else {
					callback();
				}
			},
			trigger: "blur",
		},
	],
});

watch(createdShow, (newValue) => {
	if (newValue) {
		if (modalType.value === "created") {
			finishForm.value = {
				userName: "",
				password: "",
				name: "",
				sex: 0,
				passwordTo: "",
				region: [],
			};
		} else {
			editFrom.name = editUserInfo.value.name;
			editFrom.sex = editUserInfo.value.sex;
			editFrom.region = editUserInfo.value.region.split(" ");
		}
	} else {
		ruleFormRef.value?.resetFields();
	}
});

const editUserInfo = ref<any>({});

function openCreated() {
	createdShow.value = true;
	modalType.value = "created";
}

function openEdit(row: any) {
	editUserInfo.value = row;
	createdShow.value = true;
	modalType.value = "edit";
}

function deleteClick(row: any) {
	ElMessageBox.confirm(`你确定要删除${row.name}吗?`, "Warning", {
		confirmButtonText: "是",
		cancelButtonText: "否",
		type: "warning",
	}).then(async () => {
		await removeData(row.id);
		getList(1);
		ElMessage.success("提交成功");
	});
}
</script>

<template>
	<el-card shadow="never">
		<template #header>
			<el-row>
				<el-col :span="8">
					<el-button type="primary" @click="openCreated">新增</el-button>
				</el-col>
			</el-row>
		</template>

		<div style="width: 99.9%">
			<el-table row-key="id" :data="table.list" v-loading="table.loading">
				<el-table-column
					type="index"
					label="序号"
					:index="
						(index) => {
							return (table.pagination.current - 1) * table.pagination.pageSize + index + 1;
						}
					"
					width="80"
				>
				</el-table-column>

				<el-table-column label="名称" prop="name">
					<template #default="{ row }">
						<a :href="row.href" target="_blank">{{ row.name }}</a>
					</template>
				</el-table-column>

				<el-table-column label="头像" prop="avatar">
					<template #default="{ row }">
						<el-image style="width: 40px; height: 40px" :src="row.avatar" fit="fill" />
					</template>
				</el-table-column>

				<el-table-column label="性别" prop="sex">
					<template #default="{ row }">
						<a :href="row.href" target="_blank">{{ row.sex == 1 ? "男" : "女" }}</a>
					</template>
				</el-table-column>

				<el-table-column label="位置" prop="region">
					<template #default="{ row }">
						<a :href="row.href" target="_blank">{{ row.region }}</a>
					</template>
				</el-table-column>

				<el-table-column label="操作" prop="action" width="160">
					<template #default="{ row }">
						<el-button type="primary" @click="openEdit(row)">编辑</el-button>
						<el-button type="danger" @click="deleteClick(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="padding-t10">
			<el-pagination
				background
				layout="prev, pager, next"
				v-model:current-page="table.pagination.current"
				:page-size="table.pagination.pageSize"
				:total="table.pagination.total"
				@current-change="
					(p) => {
						getList(p || 1);
					}
				"
			>
			</el-pagination>
		</div>
	</el-card>
	<el-dialog v-model="createdShow" :title="modalType === 'created' ? '创建新用户' : '编辑用户'" width="500">
		<el-form ref="ruleFormRef" :rules="rules" :model="finishForm" label-width="120px" style="padding-right: 100px">
			<el-form-item label="账号" prop="userName" v-if="modalType === 'created'">
				<el-input v-model="finishForm.userName" placeholder="请输入账号" />
			</el-form-item>
			<el-form-item label="密码" prop="password" v-if="modalType === 'created'">
				<el-input v-model="finishForm.password" placeholder="请输入密码" type="password" />
			</el-form-item>
			<el-form-item label="确认密码" prop="passwordTo" v-if="modalType === 'created'">
				<el-input v-model="finishForm.passwordTo" placeholder="请再次输入密码" type="password" />
			</el-form-item>
			<el-form-item label="用户名" prop="name">
				<el-input v-if="modalType === 'created'" v-model="finishForm.name" placeholder="请输入用户名" />
				<el-input v-else v-model="editFrom.name" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-if="modalType === 'created'" v-model="finishForm.sex" placeholder="Select" style="width: 240px">
					<el-option label="男" :value="1" />
					<el-option label="女" :value="0" />
				</el-select>
				<el-select v-else v-model="editFrom.sex" placeholder="Select" style="width: 240px">
					<el-option label="男" :value="1" />
					<el-option label="女" :value="0" />
				</el-select>
			</el-form-item>
			<el-form-item label="地区">
				<el-cascader v-if="modalType === 'created'" v-model="finishForm.region" :options="regionMap()" />
				<el-cascader v-else v-model="editFrom.region" :options="regionMap()" />
			</el-form-item>
		</el-form>

		<template #footer>
			<div class="dialog-footer">
				<el-button @click="close">关闭</el-button>
				<el-button type="primary" v-if="modalType === 'created'" @click="createdFinish">完成</el-button>
				<el-button type="primary" v-else @click="editFinish">完成</el-button>
			</div>
		</template>
	</el-dialog>
</template>
