import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApi = {
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>("/auth/login", body);
  },

  register: (body: RegisterBodyType) => {
    return http.post<RegisterResType>("/auth/register", body);
  },

  auth: (body: { sessionToken: string }) => {
    return http.post("/api/auth", body, {
      baseUrl: "", // vì đây là request nội bộ trong nextjs nên ko cần baseUrl -> lấy localhost:3000
    });
  },

  logoutFromNextServerToServer: (sessionToken: string) => {
    return http.post<MessageResType>("/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },

  logoutFromNextClientToNextServer: () => {
    return http.post<MessageResType>("/api/auth/logout", null, {
      baseUrl: "", // vì đây là request nội bộ trong nextjs nên ko cần baseUrl -> lấy localhost:3000
    });
  },
};

export default authApi;
