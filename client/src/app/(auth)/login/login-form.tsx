/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import authApi from "@/apiRequest/auth";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import { clientSessionToken } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * router.refresh() làm gì:
    Re-execute tất cả Server Components trên trang hiện tại:

    - Chạy lại code trong Server Components
    - Fetch lại data mới (nếu có API calls)
    - Re-render với data mới
    - KHÔNG reload trang, KHÔNG thay đổi URL
   */

  // nếu có api calls thì next client -> next server -> api server (từ next server -> db : khong thấy tren devtools vì server - server`)
  // tưởng tượng thêm 1 bước gọi từ next server -> api server lấy data mới và cập nhật lại html - đồng bộ lại các server component

  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApi.login(values);

      toast.success("Login is Successfully!!");
      await authApi.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt,
      });
      clientSessionToken.value = result.payload.data.token;
      router.push("/me");
      router.refresh(); // Re-render Server Component (Header) để đồng bộ sessionToken
    } catch (error: any) {
      handleErrorApi({ errors: error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  }

  // fetch thì nó luôn trả về resolve promise -> nên cần xử lý thêm cho case reject promise
  // axios sẽ tách biệt resolve và reject promise

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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Type email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Type password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
