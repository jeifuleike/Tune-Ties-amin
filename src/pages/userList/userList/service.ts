import request from "@/utils/request";
import { IQueryParams, createdFinishData, editFinishData } from "./data";

export async function queryList(params?: IQueryParams): Promise<any> {
	return request({
		url: "/user/userList",
		method: "GET",
		params,
	});
}

export async function createData(params: Omit<createdFinishData, "id">): Promise<any> {
	return request({
		url: "/user/addUser",
		method: "POST",
		data: params,
	});
}

export async function updateData(id: number, params: Omit<editFinishData, "id">): Promise<any> {
	return request({
		url: `/user/changeUserInfo/${id}`,
		method: "PUT",
		data: params,
	});
}

export async function removeData(id: number): Promise<any> {
	return request({
		url: `/user/deleteUser/${id}`,
		method: "delete",
	});
}

export async function detailData(id: number): Promise<any> {
	return request({ url: `/pages/list/${id}` });
}
