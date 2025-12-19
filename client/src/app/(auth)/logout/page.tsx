/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import authApi from "@/apiRequest/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    const sessionTokenLS = localStorage.getItem("sessionToken");
    if (sessionToken === sessionTokenLS) {
      authApi.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectFrom=${pathname}`);
      });
    }
  }, [sessionToken, router, pathname]);

  return <div>page</div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
      {/* fix lỗi useSearchParams() should be wrapped in a suspense boundary at page */}
    </Suspense>
  );
}
