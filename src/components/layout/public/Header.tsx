"use client";

import Logo from "@/components/shared/Logo";
import ToggleTheme from "@/components/shared/ToggleTheme";
import { NODE_ENV } from "@/constants/api/node-env.const";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui";
import { useState, useEffect, memo } from "react";
import Link from "next/link";
import UserButtonMenu from "../common/UserButtonMenu";

function Header() {
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
    <section className={`header-section ${scrolled && "header-scrolled"}`}>
      <div className="header-content">
        <div className="header-left">
          <Logo href="/" />
        </div>
        <div className="header-right">
          <SignedIn>
            <UserButtonMenu isFrontEnd showName />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button
                size="small"
                disabled={NODE_ENV !== "development"}
              >
                login
              </Button>
            </Link>
          </SignedOut>
          <ToggleTheme />
        </div>
      </div>
    </section>
  );
}
export default memo(Header);
