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

class ClientSessionToken {
  private token = "";
  private _expiresAt = new Date().toISOString();
  get value() {
    return this.token;
  }
  set value(token: string) {
    // nếu gọi method này ở server thì sẽ bị lỗi - chỉ chạy ở client
    if (typeof window === "undefined") {
      throw new Error("Cannot set session token on server side");
    }
    this.token = token;
  }

  get expiresAt() {
    return this._expiresAt;
  }

  set expiresAt(expiresAt: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set session token on server side");
    }
    this._expiresAt = expiresAt;
  }
}

export const clientSessionToken = new ClientSessionToken();

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : "",
  };
  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;
  const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    method,
    body,
    // credentials: "include", // dùng cho Mode_Cookie = true
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
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
      if (typeof window !== "undefined") {
        // case token hết hạn hoặc ko hợp lệ -> xóa token ở client
        await fetch("/api/auth/logout", {
          method: "POST",
          body: JSON.stringify({ force: true }), // next client gọi tới route handler logout (next server -> server backend) để xóa cookie ở server
          headers: {
            ...baseHeaders,
          },
        });
        clientSessionToken.value = "";
        clientSessionToken.expiresAt = new Date().toISOString();
        location.href = "/login"; // gọi theo kiểu client - reload trang
      } else {
        // xử lý token hết hạn hoặc ko hợp lệ thì logout - xử lý ở server

        const sessionToken = (options?.headers as any)?.Authorization.split("Bearer ")[1];
        redirect(`/logout?sessionToken=${sessionToken}`); // chạy ở server
      }
    } else {
      throw new HttpError(data as any);
    }
  }
  if (typeof window !== undefined) {
    // chỉ chạy ở client
    if (["/auth/login", "/auth/register"].some((item) => item === normalizePath(url))) {
      clientSessionToken.value = (payload as LoginResType).data.token;
      clientSessionToken.expiresAt = (payload as LoginResType).data.expiresAt;
    } else if ("/auth/logout" === normalizePath(url)) {
      clientSessionToken.value = "";
      clientSessionToken.expiresAt = new Date().toISOString();
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

  delete<Response>(url: string, body: any, options?: Omit<CustomOptions, "body"> | undefined) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
