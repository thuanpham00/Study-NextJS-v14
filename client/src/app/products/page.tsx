/* eslint-disable @typescript-eslint/no-explicit-any */
import productApi from "@/apiRequest/product";
import Image from "next/image";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Metadata } from "next";
import { ProductListResType } from "@/schemaValidations/product.schema";
import ProductEditButton from "@/app/products/_components/product-edit-button";
import ProductAddButton from "@/app/products/_components/product-add-button";
import ProductTitleAction from "@/app/products/_components/product-title-action";

export const metadata: Metadata = {
  title: "Products",
  description: "Danh sách sản phẩm trong ứng dụng quản lý sản phẩm",
};

export default async function ProductListPage() {
  const { payload } = await productApi.getList();
  const products = payload.data as ProductListResType["data"];

  return (
    <div className="p-2">
      <h1>Product list</h1>
      <ProductAddButton />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Created At</TableHead>
            <ProductTitleAction />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <Link href={`/products/${product.id}`}>
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-md w-32 h-32 object-cover"
                      />
                    )}
                  </Link>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="max-w-[300px] truncate">{product.description}</TableCell>
                <TableCell className="text-right">${product.price}</TableCell>
                <TableCell>{new Date(product.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                <ProductEditButton product={product} />
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
