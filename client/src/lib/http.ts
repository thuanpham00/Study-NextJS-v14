/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/config";
import { normalizePath } from "@/lib/utils";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [field: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super(`HTTP Error`);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    super({ status, payload });
    this.status = ENTITY_ERROR_STATUS;
    this.payload = payload;
  }
}

export const isClient = () => typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options?.body);
  }

  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  if (isClient()) {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
      baseHeaders["Authorization"] = `Bearer ${sessionToken}`; // chỉ truyền token được ở client // ở server component thì phải tự truyền vào - thêm thủ công
    }
  }

  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;
  const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    method,
    body,
    // credentials: "include", // dùng cho Mode_Cookie = true
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  // đưa về 1 kiểu dữ liệu response chung
  // chỉ có next client mới gọi được tới next server và lấy được cookie ra
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      // xử lý token hết hạn hoặc ko hợp lệ thì logout - xử lý ở client
      if (isClient()) {
        // case token hết hạn hoặc ko hợp lệ -> xóa token ở client
        await fetch("/api/auth/logout", {
          method: "POST",
          body: JSON.stringify({ force: true }), // next client gọi tới route handler logout (next server -> server backend) để xóa cookie ở server
          headers: {
            ...baseHeaders,
          } as any,
        });
        try {
        } catch (error) {
          console.log(error);
        } finally {
          localStorage.removeItem("sessionToken");
          localStorage.removeItem("sessionTokenExpiresAt");
          location.href = "/login"; // gọi theo kiểu client - reload trang
        }
      } else {
        // xử lý token hết hạn hoặc ko hợp lệ thì logout - xử lý ở server
        const sessionToken = (options?.headers as any)?.Authorization.split("Bearer ")[1];
        redirect(`/logout?sessionToken=${sessionToken}`); // chạy ở server
      }
    } else {
      throw new HttpError(data as any);
    }
  }
  if (isClient()) {
    // chỉ chạy ở client
    if (["auth/login", "auth/register"].some((item) => item === normalizePath(url))) {
      const { token, expiresAt } = (payload as LoginResType).data;
      localStorage.setItem("sessionToken", token);
      localStorage.setItem("sessionTokenExpiresAt", expiresAt);
    } else if ("auth/logout" === normalizePath(url)) {
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionTokenExpiresAt");
    }
  }
  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, "body"> | undefined) {
    return request<Response>("GET", url, options);
  },

  post<Response>(url: string, body: any, options?: Omit<CustomOptions, "body"> | undefined) {
    return request<Response>("POST", url, { ...options, body });
  },

  put<Response>(url: string, body: any, options?: Omit<CustomOptions, "body"> | undefined) {
    return request<Response>("PUT", url, { ...options, body });
  },

  delete<Response>(url: string, options?: Omit<CustomOptions, "body"> | undefined) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
