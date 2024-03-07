import request from "@/utils/request";

export async function queryUserInfo(): Promise<any> {
	return request({
		url: "/user/userInfo",
		method: "get",
	});
}
