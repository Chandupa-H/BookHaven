"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/Home"); // Redirect to the books page
  return <div className="">📚</div>;
}
