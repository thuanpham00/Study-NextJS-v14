import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApi = {
  me: (sessionToken: string) => {
    return http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },

  clientMe: () => {
    return http.get<AccountResType>("/account/me");
  },
};

export default accountApi;
