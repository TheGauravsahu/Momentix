import NavigateBack from "@/components/NavigateBack";
import SettingsForm from "@/components/SettingsForm";
import { getCurrentUserProfile } from "@/lib/data";
import React from "react";

export default async function Settings() {
  const profile = await getCurrentUserProfile();

  return (
    <div className="p-8 w-full h-full">
      <div className="flex gap-4 items-center">
        <NavigateBack />
        <h1>Settings</h1>
      </div>
      <SettingsForm profile={profile} />
    </div>
  );
}
