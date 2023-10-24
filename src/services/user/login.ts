import request from "@/utils/request";
import { ILoginData, ILoginForm, IRegister } from "./types";

export async function login(data: ILoginForm) {
  return request<ILoginData>({
    method: "post",
    url: "/user/login",
    data,
  });
}

export async function registerSms(data: IRegister) {
  return request<null>({
    method: "get",
    url: "/email/code",
    params: data,
  });
}

export async function register(data: Omit<ILoginForm, "passwordConfirm">) {
  return request<null>({
    method: "post",
    url: "/user/register",
    data,
  });
}
