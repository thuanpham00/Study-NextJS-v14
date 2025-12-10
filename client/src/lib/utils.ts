/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityError } from "@/lib/http";
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  errors,
  setError,
  duration,
}: {
  errors: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (errors instanceof EntityError && setError) {
    errors.payload.errors.forEach((item) => {
      setError(item.field as "email" | "password" | "name" | "confirmPassword", {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast.error("Lỗi", {
      description: errors?.payload?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
      duration: duration || 5000,
    });
  }
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : `/${path}`;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};
