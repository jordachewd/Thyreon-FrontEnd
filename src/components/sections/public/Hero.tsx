import css from "@/styles/sections/public/Hero.module.css";
import { NODE_ENV } from "@/constants/api/node-env.const";
import { Typography, Button } from "@mui/material";
import Image from "next/image";

export default function Hero() {
  return (
    <div className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <Typography variant="h2">Maintenance Made Easy</Typography>

          <Typography variant="h5">
            Keep your WordPress site secure and up-to-date with automated
            maintenance amoring.
          </Typography>

          <Button
            size="large"
            variant="contained"
            href="/sign-up"
            sx={{ minWidth: 300 }}
            disabled={NODE_ENV !== "development"}
          >
            Get Started
          </Button>
        </div>

        <div className={css.right}>
          <Image
            src="/images/home-hero.png"
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
