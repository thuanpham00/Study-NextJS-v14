import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApi = {
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>("/auth/login", body);
  },

  register: (body: RegisterBodyType) => {
    return http.post<RegisterResType>("/auth/register", body);
  },

  logoutFromNextServerToServer: (sessionToken: string) => {
    return http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
  },

  slideSessionFromNextServerToServer: (sessionToken: string) => {
    return http.post<SlideSessionResType>(
      "/auth/slide-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
  },

  // route handler
  auth: (body: { sessionToken: string; expiresAt: string }) => {
    return http.post("/api/auth", body, {
      baseUrl: "", // vì đây là request nội bộ trong nextjs nên ko cần baseUrl -> lấy localhost:3000
    });
  },

  logoutFromNextClientToNextServer: (force?: boolean | undefined) => {
    return http.post<MessageResType>(
      "/api/auth/logout",
      { force },
      {
        baseUrl: "", // vì đây là request nội bộ trong nextjs nên ko cần baseUrl -> lấy localhost:3000
      }
    );
  },

  slideSessionFromNextClientToNextServer: () => {
    return http.post<SlideSessionResType>(
      "/api/auth/slide-session",
      {},
      {
        baseUrl: "",
      }
    );
  },
};

export default authApi;
