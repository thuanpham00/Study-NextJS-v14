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
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from "@/schemaValidations/account.schema";
import accountApi from "@/apiRequest/account";
import { useRouter } from "next/navigation";

type Profile = AccountResType["data"];

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
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

  async function onSubmit(values: UpdateMeBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      await accountApi.updateMe(values);
      router.refresh(); // gửi 1 request mới lên next server để lấy data mới nhất
      toast.success("Update profile is Successfully!!");
    } catch (error: any) {
      handleErrorApi({ errors: error, setError: form.setError });
    } finally {
      setLoading(false);
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
          <FormControl>
            <Input placeholder="Type email" type="text" value={profile.email} readOnly />
          </FormControl>

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
          <Button type="submit" className="mt-4 w-full">
            Cập nhật
          </Button>
        </form>
      </Form>
    </div>
  );
}
