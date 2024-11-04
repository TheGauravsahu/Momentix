"use client";
import { useEffect } from "react";

export default function ThemeObserver() {
  useEffect(() => {
    const theme = window.localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return null;
}
