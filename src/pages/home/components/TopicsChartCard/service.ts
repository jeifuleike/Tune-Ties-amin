import request from "@/utils/request";

export async function monthnewTopics(): Promise<any> {
	return request({
		url: "/socket/musicUsers",
		method: "get",
	});
}
