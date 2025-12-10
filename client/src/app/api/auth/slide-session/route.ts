import authApi from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

// flow từ next client gọi lên next server lấy token trong cookie ra -> gọi xuống backend server để thay đổi giá trị hết hạn của token
export async function POST() {
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
    const res = await authApi.slideSessionFromNextServerToServer(sessionToken.value);
    const expiresDate = new Date(res.payload.data.expiresAt).toUTCString();
    return Response.json(res.payload, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken.value}; Path=/; HttpOnly; Expires=${expiresDate};`, // cookie này thuộc về next client
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
