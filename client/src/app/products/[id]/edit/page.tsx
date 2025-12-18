/* eslint-disable @typescript-eslint/no-unused-vars */
import productApi from "@/apiRequest/product";
import ProductAddForm from "@/app/products/_components/product-add-form";

import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";

const getDetail = cache(productApi.getDetail);

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Option cache: 'no-store' trong productApiRequest với cái 'const getDetail = cache(productApiRequest.getDetail)'. 2 cái cache khác nhau ở chỗ nào ạ ?
/**
 * cái đầu tiên là cache của fetch api. cái thứ 2 k phải của fetch api mà của reactJS,
   dành cho những request không dùng no-store đc (ví dụ dùng axios, query db) 
 */

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params;

  const { payload } = await getDetail(Number(id));
  const product = payload.data;

  return {
    title: "Edit sản phẩm " + product.name,
    description: product.description,
  };
} // hàm này chỉ dùng được ở server component

export default async function ProductDetailEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product = undefined;
  try {
    const { payload } = await getDetail(Number(id));
    product = payload.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="p-2">
      {!product && <div>Không tìm thấy sản phẩm...</div>}
      <ProductAddForm product={product} />
    </div>
  );
}
