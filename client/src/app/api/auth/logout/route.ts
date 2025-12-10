import authApi from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;

  if (force) {
    // khi token hết hạn hoặc ko hợp lệ từ client gửi lên -> buộc đăng xuất
    return Response.json(
      {
        message: "Buộc đăng xuất thành công",
      },
      {
        status: 200,
        headers: {
          // xóa cookie sessionToken
          "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`, // set token vô server next - cookie này thuộc về client next
        },
      }
    );
  }
  // khi token vẫn còn hạn sử dụng logout bình thường
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken");
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session" },
      {
        status: 401,
      }
    );
  }
  try {
    const result = await authApi.logoutFromNextServerToServer(sessionToken.value);
    return Response.json(result.payload, {
      status: 200,
      headers: {
        // xóa cookie sessionToken
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`, // set token vô server next - cookie này thuộc về client next
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
