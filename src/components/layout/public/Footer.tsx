"use client";

import lightLogo from "../../../../public/images/jwd_light.png";
import darkLogo from "../../../../public/images/jwd_dark.png";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

 function Footer() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  return (
    <section className="footer-section">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-jwd-logo">
            <Image
              src={isDark ? lightLogo : darkLogo}
              alt="JWD"
              width={32}
              height={32}
              className="z-10"
              priority
            />
          </div>

          <div className="footer-jwd-info">
            <span>© {new Date().getFullYear()} JordacheWD.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
        <div className="footer-right">
          <span>Privacy & Cookie Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </section>
  );
}
export default memo(Footer);