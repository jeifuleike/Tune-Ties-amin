import request from "@/utils/request";

export async function annualnewLinks(): Promise<any> {
	return request({
		url: "/home/chatStats",
		method: "get",
	});
}
