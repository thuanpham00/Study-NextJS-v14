import accountApi from "@/apiRequest/account";
import Profile from "@/app/me/profile";
import { cookies } from "next/headers";
import React from "react";

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken");
  const result = await accountApi.me(sessionToken?.value || "");
  return (
    <div>
      <div>Profile</div>
      <h1>Xin chào, {result.payload.data.name}</h1>
      <Profile />
    </div>
  );
}
