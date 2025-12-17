"use client";

import { Tooltip, Button } from "@/components/ui";
import { memo, useEffect, useState } from "react";

type ColorSchemes = "system" | "light" | "dark";

function ToggleTheme() {
  const [mode, setMode] = useState<ColorSchemes>("system");

  useEffect(() => {
    // Read theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as ColorSchemes;
    if (savedTheme) {
      setMode(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = defaultMode ? "dark" : "light";
      setMode(theme);
      document.documentElement.classList.toggle("dark", defaultMode);
    }
  }, []);

  const handleSetMode = (newMode: ColorSchemes) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    document.documentElement.classList.toggle("dark", newMode === "dark");
  };

  return (
    <div className="flex gap-1" role="group" aria-label="theme-toggle">
      <Tooltip title="Light" placement="bottom">
        <Button
          size="small"
          onClick={() => handleSetMode("light")}
          variant={mode === "light" ? "primary" : "outline"}
          className="min-w-0 px-2 py-1 rounded-lg border-0"
        >
          <i className="bi bi-sun text-sm"></i>
        </Button>
      </Tooltip>
      <Tooltip title="Dark" placement="bottom">
        <Button
          size="small"
          onClick={() => handleSetMode("dark")}
          variant={mode === "dark" ? "primary" : "outline"}
          className="min-w-0 px-2 py-1 rounded-lg border-0"
        >
          <i className="bi bi-moon-stars text-sm"></i>
        </Button>
      </Tooltip>
    </div>
  );
}

export default memo(ToggleTheme);
