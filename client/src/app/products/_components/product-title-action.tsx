"use client";
import { TableHead } from "@/components/ui/table";
import { isClient } from "@/lib/http";
import React from "react";

export default function ProductTitleAction() {
  const isAuthenticated = isClient() && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated) return null;
  return <TableHead>Action</TableHead>;
}

// để biến page product list thành static rendering thì cần tách component nút edit và delete ra component client riêng biệt (vì nó dùng LocalStorage)
