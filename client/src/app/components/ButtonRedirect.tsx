'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function ButtonRedirect() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/login");
  };

  return <button onClick={handleNavigate}>Chuyển tới trang login</button>;
}
