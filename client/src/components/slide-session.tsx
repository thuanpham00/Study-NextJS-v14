"use client";
import authApi from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { useEffect } from "react";
import { differenceInHours } from "date-fns";

export default function SlideSession() {
  // không đợi token hết hạn mà hãy tự động gia hạn token khi gần hết
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const expiresAt = new Date(clientSessionToken.expiresAt);

      if (differenceInHours(expiresAt, now) < 1) {
        // nếu bé hơn 1 giờ thì slide lại session
        const res = await authApi.slideSessionFromNextClientToNextServer();
        clientSessionToken.expiresAt = res.payload.data.expiresAt;
      }
    }, 1000 * 60 * 60); // 60 minutes

    return () => {
      return clearInterval(interval);
    };
  }, []);

  return null;
}
