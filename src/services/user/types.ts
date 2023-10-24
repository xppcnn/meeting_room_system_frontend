export interface ILoginForm {
  username: string;
  password: string;
}

interface Role {
  id: number;
  name: string;
}
interface Permission {
  id: number;
  code: string;
  description: string;
}
export interface UserInfo {
  id: number;

  userName: string;

  nickName: string;

  email: string;

  headPic: string;

  phoneNumber: string;

  isFrozen: boolean;

  isAdmin: boolean;

  roles: Role[];

  permissions: Permission[];
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export type ILoginData = {
  userInfo: UserInfo;
} & Token;
