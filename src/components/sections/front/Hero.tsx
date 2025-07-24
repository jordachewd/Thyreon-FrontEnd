import css from "@/styles/sections/front/Hero.module.css";
import { Typography, Button } from "@mui/material";
import Image from "next/image";
import { memo } from "react";

function Hero() {
  return (
    <div className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <Typography variant="h2">WordPress Maintenance Made Easy</Typography>

          <Typography variant="h5">
            Keep your WordPress site secure and up-to-date with automated
            maintenance amoring.
          </Typography>

          <Button
            size="large"
            variant="contained"
            href="/sign-up"
            sx={{ minWidth: 300 }}
          >
            Get Started
          </Button>
        </div>

        <div className={css.right}>
          <Image
            src="/images/wpguard-lp-hero.png"
            alt="hero"
            width={700}
            height={700}
            priority
            className="z-10"
          />

          <div className={css.shadow}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
export default memo(Hero);
