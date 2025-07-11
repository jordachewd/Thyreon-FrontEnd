"use client";
import css from "@/styles/layout/front/Header.module.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ToggleTheme from "@/components/shared/ToggleTheme";
import Logo from "../../shared/Logo";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
            <Button size="small" href="/sign-in">
              login
            </Button>
          </SignedOut>

          <ToggleTheme />
        </div>
      </div>
    </section>
  );
}
