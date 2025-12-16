import accountApi from "@/apiRequest/account";
import ProfileForm from "@/app/me/profile-form";
import { cookies } from "next/headers";
import React from "react";

export default async function MeProfile() {
  // Khi truy cập page thì mặc định là client gửi request đến server next ròi nên có thể lấy cookie từ next client
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken");

  // vì dùng cookie nên api này sẽ không được cached trên server
  const result = await accountApi.me(sessionToken?.value || "");
  return (
    <div>
      <div>Profile</div>
      {/* <h1>Xin chào, {result.payload.data.name}</h1> */}
      {/* <Profile /> */}

      <ProfileForm profile={result.payload.data} />
    </div>
  );
}
