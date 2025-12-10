/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import authApi from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authApi.logoutFromNextClientToNextServer();
    } catch (error) {
      handleErrorApi({ errors: error });
      authApi.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectFrom=${pathname}`);
      });
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}
