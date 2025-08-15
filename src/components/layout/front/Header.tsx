"use client";

import Logo from "@/components/shared/Logo";
import ToggleTheme from "@/components/shared/ToggleTheme";
import { NODE_ENV } from "@/constants/api/node-env.const";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import css from "@/styles/layout/front/Header.module.css";
import UserButtonMenu from "../common/UserButtonMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY > 50 ? true : false;
      setScrolled(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`${css.section} ${scrolled && css.scrolled}`}>
      <div className={css.content}>
        <div className={css.left}>
          <Logo fullLogo />
        </div>
        <div className={css.right}>
          <SignedIn>
            <UserButtonMenu isFrontEnd />
          </SignedIn>
          <SignedOut>
            <Button
              size="small"
              href="/sign-in"
              disabled={NODE_ENV !== "development"}
            >
              login
            </Button>
          </SignedOut>
          <ToggleTheme />
        </div>
      </div>
    </section>
  );
}
