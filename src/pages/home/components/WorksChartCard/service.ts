import request from "@/utils/request";

export async function weeknewWorks(): Promise<any> {
	return request({
		url: "/socket/connectUsers",
		method: "get",
	});
}
