import request from "@/utils/request";
import { IQueryParams, createdFinishData } from "./data";

export async function queryList(params?: IQueryParams): Promise<any> {
	return request({
		url: "/user/amidList",
		method: "GET",
		params,
	});
}

export async function createData(params: Omit<createdFinishData, "id">): Promise<any> {
	return request({
		url: "/user/addAmid",
		method: "POST",
		data: params,
	});
}

export async function updateData(id: number, params: Omit<createdFinishData, "id">): Promise<any> {
	return request({
		url: `/user/changeAmidInfo/${id}`,
		method: "PUT",
		data: params,
	});
}

export async function removeData(id: number): Promise<any> {
	return request({
		url: `/user/deleteAmid/${id}`,
		method: "delete",
	});
}

export async function detailData(id: number): Promise<any> {
	return request({ url: `/pages/list/${id}` });
}
