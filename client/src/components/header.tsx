"use client";
import { useAppContext } from "@/app/AppProvider";
import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Fragment } from "react";

export default function Header() {
  const { profile } = useAppContext();

  return (
    <div className="flex items-center justify-between m-2">
      <ul className="flex items-center gap-2">
        {!profile ? (
          <Fragment>
            <li>
              <Link
                href="/login"
                className="bg-orange-500 p-2 rounded-md text-black text-sm hover:bg-gray-200 duration-100"
              >
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="bg-white p-2 rounded-md text-black text-sm hover:bg-gray-200 duration-100"
              >
                Đăng ký
              </Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="mr-2">
              <Link href={"/me"}>
                <Button variant={"link"}>Xin chào {profile?.name}</Button>
              </Link>
            </li>
            <li>
              <ButtonLogout />
            </li>
          </Fragment>
        )}
        <li>
          <Link href={"/products"}>
            <Button variant={"secondary"}>Danh sách sản phẩm</Button>
          </Link>
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}
