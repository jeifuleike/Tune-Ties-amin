import request from "@/utils/request";
import { LoginParamsType, registerParamsType } from "./data";

export async function accountLogin(params: LoginParamsType): Promise<any> {
	return request({
		url: "/user/login",
		method: "POST",
		data: params,
	});
}

export async function accountRegister(params: registerParamsType): Promise<any> {
	return request({
		url: "/user/register",
		method: "POST",
		data: params,
	});
}
