"use client";

import { useLayoutEffect } from "react";

export default function RefreshRedirect() {
  useLayoutEffect(() => {
    const navEntries = performance.getEntriesByType(
      "navigation",
    ) as PerformanceNavigationTiming[];

    console.log("navEntries", navEntries);
    const isRefresh = navEntries[0]?.type === "reload";

    const pathname = window.location.pathname;
    const hash = window.location.hash;

    console.log("pathname", pathname, "hash", hash);

    const isHomeSectionRefresh = pathname === "/" && hash !== "";

    if (isRefresh && isHomeSectionRefresh) {
      sessionStorage.removeItem("introPlayed");
      sessionStorage.removeItem("heroPlayed");
      sessionStorage.removeItem("navbarPlayed");

      window.location.replace("/");
    }
  }, []);

  return null;
}

