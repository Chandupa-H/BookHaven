"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { jwtDecode } from "jwt-decode";

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      const decoded = jwtDecode(token);

      dispatch(
        setUser({
          user: { username: decoded.username, id: decoded.id }, // or get this from server
          token: token,
        })
      );

      router.replace("/");
    }
  }, [searchParams, dispatch, router]);

  return <div>Logging you in...</div>;
}
