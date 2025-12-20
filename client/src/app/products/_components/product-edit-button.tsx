"use client";
import DeleteProduct from "@/app/products/_components/delete-product";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { isClient } from "@/lib/http";
import { ProductListResType } from "@/schemaValidations/product.schema";
import Link from "next/link";
import React from "react";

export default function ProductEditButton({ product }: { product: ProductListResType["data"][0] }) {
  const isAuthenticated = isClient() && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated) return null;
  return (
    <TableCell className="space-x-2 flex">
      <Link href={`/products/${product.id}/edit`}>
        <Button variant={"default"}>Edit</Button>
      </Link>
      <DeleteProduct product={product} />
    </TableCell>
  );
}

// để biến page product list thành static rendering thì cần tách component nút edit và delete ra component client riêng biệt (vì nó dùng LocalStorage)
