"use client";
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

export default function AppProvider({ children, user }: { children: React.ReactNode; user: User | null }) {
  const [profile, setProfile] = useState<User | null>(user);

  return <AppContext.Provider value={{ profile, setProfile }}>{children}</AppContext.Provider>;
}
