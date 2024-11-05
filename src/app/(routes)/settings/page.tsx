import SettingsForm from "@/components/SettingsForm";
import { getCurrentUserProfile } from "@/lib/data";
import React from "react";

export default async function Settings() {
  const profile = await getCurrentUserProfile();

  return (
    <div className="p-8 w-full h-full">
      <h1>Settings</h1>
      <SettingsForm profile={profile} />
    </div>
  );
}
