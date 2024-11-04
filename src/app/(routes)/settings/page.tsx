import { getUserEmail } from "@/lib/utils";
import React from "react";

export default async function Settings() {
  const userId = await getUserEmail();

  return (
    <div className="p-8">
      <h1>Settings</h1>
      {userId}
    </div>
  );
}
