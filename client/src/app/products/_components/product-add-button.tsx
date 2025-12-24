"use client";
import { isClient } from "@/lib/http";
import Link from "next/link";
import React from "react";

export default function ProductAddButton() {
  const isAuthenticated = isClient() && Boolean(localStorage.getItem("sessionToken")); // cần check thêm isClient vì localStorage chỉ có ở client
  console.log(isAuthenticated);
  if (!isAuthenticated) return null;
  return (
    <Link
      className="bg-red-500 p-2 mt-2 inline-block rounded-md text-white text-sm hover:bg-gray-200 duration-100"
      href={"/products/add"}
    >
      Add Product
    </Link>
  );
}

// để biến page product list thành static rendering thì cần tách component nút add ra component client riêng biệt (vì nó dùng LocalStorage)
