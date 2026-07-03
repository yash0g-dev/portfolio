"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/ui/Navbar";
import About from "@/components/sections/About";
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import ContactSection from "@/components/sections/contact/ContactSection";
import WelcomeScreen from "@/components/WelcomeScreen";

import { hasPlayedIntro, setIntroPlayed } from "@/lib/introState";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const currentHash = window.location.hash;
    const pathname = window.location.pathname;

    if (currentHash === "#portfolio") {
      setShowWelcome(false);
      return;
    }

    const navEntries = performance.getEntriesByType("navigation");
    const navigationType =
      navEntries.length > 0
        ? (navEntries[0] as PerformanceNavigationTiming).type
        : null;

    const isReload = navigationType === "reload";

    // Reset intro only on homepage reload
    if (isReload && pathname === "/") {
      sessionStorage.removeItem("introPlayed");
      sessionStorage.removeItem("heroPlayed");

      if (window.location.hash) {
        history.replaceState(null, "", "/");
      }

      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }

    if (!hasPlayedIntro()) {
      setShowWelcome(true);

      const timer = setTimeout(() => {
        setShowWelcome(false);
        setIntroPlayed();
      }, 2800);

      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, []);

  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      {/* Ensure your AnimatedBackground component has a z-index (e.g., zIndex: 0 or -1)
        in its own file so the image from About can slip behind it.
      */}
      <AnimatedBackground />

      {/* Keeping position: "relative" here without a z-index allows children 
        (like the image in About) to establish their own stacking order with the background.
      */}
      <div style={{ position: "relative" }}>
        <Navbar />
        {/* With Hero removed, About is now the first section you see when the Welcome screen slides up */}
        <About />
        <PortfolioShowcase />
        <ContactSection />
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
            }}
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
