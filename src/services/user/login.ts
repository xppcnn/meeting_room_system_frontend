import request from "@/utils/request";
import { ILoginData, ILoginForm } from "./types";

export async function login(data: ILoginForm) {
  return request<ILoginData>({
    method: "post",
    url: "/user/login",
    data,
  });
}
