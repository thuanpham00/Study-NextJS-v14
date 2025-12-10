/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import authApi from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    if (sessionToken === clientSessionToken.value) {
      authApi.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectFrom=${pathname}`);
      });
    }
  }, [sessionToken, router, pathname]);

  return <div>page</div>;
}
