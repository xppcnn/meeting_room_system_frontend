import { Token, UserInfo } from "@/services/user/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface userInfoState {
  userInfo: (UserInfo & Token) | null;
  setUserInfo: (info: userInfoState["userInfo"]) => void;
}

const useUserInfoStore = create<userInfoState>()(
  devtools(
    persist(
      (set) => ({
        userInfo: null,
        setUserInfo: (userInfo) => set(() => ({ userInfo })),
      }),
      { name: "userInfo" }
    )
  )
);

export default useUserInfoStore;
