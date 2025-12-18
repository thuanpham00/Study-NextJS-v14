import http from "@/lib/http";
import { AccountResType, UpdateMeBodyType } from "@/schemaValidations/account.schema";

const accountApi = {
  me: (sessionToken: string) => {
    return http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  }, // gọi ở server nên phải truyền sessionToken vào

  clientMe: () => {
    return http.get<AccountResType>("/account/me");
  },

  updateMe: (body: UpdateMeBodyType) => {
    return http.put<AccountResType>("/account/me", body);
  },
};

export default accountApi;
