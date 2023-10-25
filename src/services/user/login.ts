import request from "@/utils/request";
import { ILoginData, ILoginForm, IRegisterCode, IResetPswForm } from "./types";

export async function login(data: ILoginForm) {
  return request<ILoginData>({
    method: "post",
    url: "/user/login",
    data,
  });
}

export async function registerSms(data: IRegisterCode) {
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

export async function resetPsw(data: IResetPswForm) {
  return request<null>({
    method: "post",
    url: "/user/resetPassword",
    data,
  });
}

export async function getResetPswSms(data: IRegisterCode) {
  return request<null>({
    method: "get",
    url: "/email/reset_password/captcha",
    params: data,
  });
}
