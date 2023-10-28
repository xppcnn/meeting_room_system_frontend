import request from "@/utils/request";

export async function register(data) {
  return request<null>({
    method: "post",
    url: "/set_user_avatar",
    data,
  });
}
