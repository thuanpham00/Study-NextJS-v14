/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreateProductBody,
  CreateProductBodyType,
  UpdateProductBodyType,
} from "@/schemaValidations/product.schema";
import productApi from "@/apiRequest/product";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export type ProductDetail = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProductAddForm({ product }: { product?: ProductDetail }) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      image: product?.image || "",
    },
  });

  const imageWatch = form.watch("image");

  const createProduct = async (values: CreateProductBodyType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadResult = await productApi.uploadImage(formData);
      const imageUrl = uploadResult.payload.data;
      values.image = imageUrl;

      const result = await productApi.create(values);

      toast.success(result.payload.message || "Create product successfully");

      router.push("/products");
    } catch (error: any) {
      handleErrorApi({ errors: error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (values: UpdateProductBodyType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        const uploadResult = await productApi.uploadImage(formData);
        const imageUrl = uploadResult.payload.data;
        values.image = imageUrl;
      }
      const result = await productApi.update(product?.id as number, values);
      toast.success(result.payload.message || "Create product successfully");

      router.push("/products");
    } catch (error: any) {
      handleErrorApi({ errors: error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return;
    if (product) {
      await updateProduct(values);
    } else {
      await createProduct(values);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error);
          })}
          className="space-y-4 max-w-[500px] mx-auto"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type price"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onClick={() => {
                      setFile(null);
                      form.setValue("image", "");
                    }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFile(file);
                        field.onChange("http://localhost:3000/" + file.name);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(file || imageWatch) && (
            <div className="flex flex-col items-center">
              <Image
                src={file ? URL.createObjectURL(file) : imageWatch}
                alt="Preview"
                width={200}
                height={200}
              />
              <Button
                className="mt-2"
                variant={"destructive"}
                onClick={() => {
                  setFile(null);
                  form.setValue("image", "");
                }}
                type="button"
              >
                Xóa hình ảnh
              </Button>
            </div>
          )}

          <Button type="submit" className="mt-2 w-full">
            {product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
