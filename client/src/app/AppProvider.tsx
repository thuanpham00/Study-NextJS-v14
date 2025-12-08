"use client";
import { clientSessionToken } from "@/lib/http";
import { useState } from "react";

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  useState(() => {
    if (typeof window !== "undefined") {
      // chỉ chạy ở client
      clientSessionToken.value = initialSessionToken;
    }
  }); // render lần đầu gán giá trị ban đầu cho sessionToken tránh case undefined - chạy trước ở nơi khác

  return <>{children}</>;
}
