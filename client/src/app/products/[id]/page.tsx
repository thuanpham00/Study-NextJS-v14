/* eslint-disable @typescript-eslint/no-unused-vars */
import productApi from "@/apiRequest/product";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import envConfig from "@/config";
import { baseOpenGraph } from "@/app/sahred-metadata";

const getDetail = cache(productApi.getDetail);

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params;

  const { payload } = await getDetail(Number(id));
  const product = payload.data;
  const url = envConfig.NEXT_PUBLIC_URL + "/products/" + id;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      ...baseOpenGraph,
      title: product.name,
      description: product.description,
      url: url,
      siteName: "Product App",
      images: [
        {
          url: product.image, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
} // hàm này chỉ dùng được ở server component

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product = undefined;
  try {
    const { payload } = await getDetail(Number(id));
    product = payload.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="w-full p-2">
      {!product && <div>Không tìm thấy sản phẩm...</div>}
      <h1>{product?.name}</h1>
      <h2>{product?.description}</h2>
      <h3>{product?.price}</h3>
      <Image
        src={product?.image || ""}
        alt={product?.name || ""}
        width={300}
        height={300}
        className="w-32 h-32 object-cover"
      />
    </div>
  );
}
