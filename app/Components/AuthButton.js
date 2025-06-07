"use client";

import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

export default function AuthButton() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? (
    <>
      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-semibold">
        {user?.username?.charAt(0).toUpperCase()}
      </div>
      <LogoutButton />
    </>
  ) : (
    <a
      href="/auth"
      className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
    >
      <span className="text-sm">👤</span>
      <span>Sign Up</span>
    </a>
  );
}
