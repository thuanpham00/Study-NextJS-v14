"use client";
import accountApi from "@/apiRequest/account";
import React, { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    const fetchReq = async () => {
      await accountApi.clientMe();
    };
    fetchReq();
  }, []);

  return <div>profile</div>;
}
