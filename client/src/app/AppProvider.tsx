"use client";
import { AccountResType } from "@/schemaValidations/account.schema";
import { createContext, useContext, useEffect, useState } from "react";

type User = AccountResType["data"];

const AppContext = createContext<{
  profile: User | null;
  setProfile: (user: User | null) => void;
  isAuthenticated: boolean;
}>({
  profile: null,
  setProfile: () => {},
  isAuthenticated: false,
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<User | null>(null);
  const isAuthenticated = Boolean(profile);

  const setProfile = (user: User | null) => [
    setProfileState(user),
    localStorage.setItem("profile", JSON.stringify(user)),
  ];

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    setProfileState(profile ? JSON.parse(profile) : null);
  }, []);

  return (
    <AppContext.Provider value={{ profile, setProfile, isAuthenticated }}>{children}</AppContext.Provider>
  );
}
