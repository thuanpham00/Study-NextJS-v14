/* eslint-disable @typescript-eslint/no-explicit-any */
import productApi from "@/apiRequest/product";
import Image from "next/image";
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteProduct from "@/app/products/_components/delete-product";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Danh sách sản phẩm trong ứng dụng quản lý sản phẩm",
};

export default async function ProductListPage() {
  const { payload } = await productApi.getList();
  const products = payload.data;
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken");
  const isAuth = Boolean(sessionToken);

  return (
    <div className="p-2">
      <h1>Product list</h1>
      {isAuth && (
        <Link
          className="bg-red-500 p-2 mt-2 inline-block rounded-md text-white text-sm hover:bg-gray-200 duration-100"
          href={"/products/add"}
        >
          Add Product
        </Link>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Created At</TableHead>
            {isAuth && <TableHead>Action</TableHead>}
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
                {isAuth && (
                  <TableCell className="space-x-2 flex">
                    <Link href={`/products/${product.id}/edit`}>
                      <Button variant={"default"}>Edit</Button>
                    </Link>
                    <DeleteProduct product={product} />
                  </TableCell>
                )}
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
