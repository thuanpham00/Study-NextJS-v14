/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
import { toast } from "sonner";
import authApi from "@/apiRequest/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
import { useAppContext } from "@/app/AppProvider";

export default function RegisterForm() {
  const { setProfile } = useAppContext();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
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

  // nếu có api get thì next client -> next server -> api server (từ next server -> db : khong thấy tren devtools vì server - server)
  // tưởng tượng thêm 1 bước gọi từ next server -> api server lấy data mới và cập nhật lại html - đồng bộ lại các server component

  async function onSubmit(values: RegisterBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApi.register(values);
      toast.success("Register is Successfully!!");
      await authApi.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt,
      });
      router.push("/me");
      router.refresh(); // Re-render Server Component (Header) để đồng bộ sessionToken
      setProfile(result.payload.data.account);
    } catch (error: any) {
      handleErrorApi({ errors: error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  }
  // xử lý thêm case reject sau đó kết hợp try catch để catch bắt được lỗi reject throw

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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Type name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Type confirm password" type="password" {...field} />
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
