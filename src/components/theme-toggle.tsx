"use client";

import { useSyncExternalStore } from "react";
import { MaterialIcon } from "@/components/material-icon";

const THEME_KEY = "nk-theme";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
}

function readThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const domTheme = document.documentElement.dataset.theme;
  if (domTheme === "light" || domTheme === "dark") {
    return domTheme;
  }

  return getPreferredTheme();
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onThemeChanged = () => {
    onStoreChange();
  };

  const onStorageChanged = (event: StorageEvent) => {
    if (event.key && event.key !== THEME_KEY) {
      return;
    }

    const nextTheme = getPreferredTheme();
    applyTheme(nextTheme);
    onStoreChange();
  };

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemThemeChanged = () => {
    if (!window.localStorage.getItem(THEME_KEY)) {
      const nextTheme = getPreferredTheme();
      applyTheme(nextTheme);
      onStoreChange();
    }
  };

  window.addEventListener("nk-theme-changed", onThemeChanged);
  window.addEventListener("storage", onStorageChanged);
  media.addEventListener("change", onSystemThemeChanged);

  return () => {
    window.removeEventListener("nk-theme-changed", onThemeChanged);
    window.removeEventListener("storage", onStorageChanged);
    media.removeEventListener("change", onSystemThemeChanged);
  };
}

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, readThemeSnapshot, () => "light");

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event("nk-theme-changed"));
  };

  const label = theme === "dark" ? "Light Mode" : "Dark Mode";
  const icon = theme === "dark" ? "light_mode" : "dark_mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={className}
    >
      <MaterialIcon name={icon} className="text-base" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
