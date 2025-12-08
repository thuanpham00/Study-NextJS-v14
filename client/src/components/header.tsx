"use client";
import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/toggle-theme";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between m-2">
      <ul className="flex items-center gap-2">
        <li>
          <Link
            href="/login"
            className="bg-white p-2 rounded-2xl text-black text-base hover:bg-gray-200 duration-100"
          >
            Đăng nhập
          </Link>
        </li>
        <li>
          <Link
            href="/register"
            className="bg-white p-2 rounded-2xl text-black text-base hover:bg-gray-200 duration-100"
          >
            Đăng ký
          </Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}
