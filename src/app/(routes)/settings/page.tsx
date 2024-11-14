import NavigateBack from "@/components/NavigateBack";
import SettingsForm from "@/components/SettingsForm";
import { getCurrentUserProfile } from "@/lib/data";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings – Momentix",
  description:
    "Manage your Momentix account settings and preferences. Update your profile, customize your experience, and control your account to make the most of capturing and sharing moments.",
};

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
