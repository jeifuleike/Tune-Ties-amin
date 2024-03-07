import request from "@/utils/request";

export async function annualnewLinks(): Promise<any> {
	return request({
		url: "/home/homeTypeset",
		method: "get",
	});
}

export async function changeData(data: any): Promise<any> {
	return request({
		url: "/home/changeHomeTypeset",
		method: "put",
		data,
	});
}
