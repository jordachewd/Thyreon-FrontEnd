import css from "@/styles/sections/Hero.module.css";
import { Typography, Button } from "@mui/material";
import Image from "next/image";

export default function Hero() {
  return (
    <div className={css.hero}>
      <div className={css.heroContent}>
        <div className={css.heroLeft}>
          <Typography variant="h2">WordPress Maintenance Made Easy</Typography>

          <Typography variant="h6">
            Keep your WordPress site secure and up-to-date with automated
            maintenance amoring.
          </Typography>

          <Button
            size="large"
            variant="outlined"
            href="/sign-up"
            sx={{ minWidth: 300 }}
          >
            Try it for free
          </Button>
        </div>

        <div className={css.heroRight}>
          <Image
            src="/images/wpguard-lp-hero.png"
            alt="hero"
            width={700}
            height={700}
            priority
            className="z-10"
          />

          <div className={css.heroShadow}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
