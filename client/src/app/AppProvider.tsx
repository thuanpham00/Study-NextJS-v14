"use client";
import { clientSessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { createContext, useContext, useState } from "react";

type User = AccountResType["data"];

const AppContext = createContext<{
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  profile: null,
  setProfile: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = "",
  user,
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
  user: User | null;
}) {
  const [profile, setProfile] = useState<User | null>(user);

  useState(() => {
    if (typeof window !== "undefined") {
      // chỉ chạy ở client
      clientSessionToken.value = initialSessionToken;
    }
  }); // render lần đầu gán giá trị ban đầu cho sessionToken tránh case undefined - chạy trước ở nơi khác

  return <AppContext.Provider value={{ profile, setProfile }}>{children}</AppContext.Provider>;
}
