import accountApi from "@/apiRequest/account";
import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { Fragment } from "react";

export default async function Header() {
  // Khi truy cập page thì mặc định là client gửi request đến server next ròi nên có thể lấy cookie từ next client
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken");
  let user = null;
  try {
    const res = await accountApi.me(sessionToken?.value || "");
    user = res.payload.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex items-center justify-between m-2">
      <ul className="flex items-center gap-2">
        {!sessionToken ? (
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
            <li>Xin chào {user?.name}</li>
            <li>
              <Link href={"/products"}>
                <Button variant={"secondary"}>Danh sách sản phẩm</Button>
              </Link>
            </li>
          </Fragment>
        )}
        <li>
          <ButtonLogout />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}
