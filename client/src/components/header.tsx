import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { AccountResType } from "@/schemaValidations/account.schema";
import Link from "next/link";
import { Fragment } from "react";

export default async function Header({ user }: { user: AccountResType["data"] | null }) {
  return (
    <div className="flex items-center justify-between m-2">
      <ul className="flex items-center gap-2">
        {!user ? (
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
                <Button variant={"link"}>Xin chào {user?.name}</Button>
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
