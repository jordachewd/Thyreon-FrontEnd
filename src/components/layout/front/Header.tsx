"use client";
import css from "@/styles/layout/front/Header.module.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ToggleTheme from "@/components/shared/ToggleTheme";
import Logo from "../../shared/Logo";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NODE_ENV } from "@/constants/api/node-env.const";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  console.log("NODE_ENV:", NODE_ENV);

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
            <Button size="small" href="/dashboard">
              Dashboard
            </Button>
            <UserButton />
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
