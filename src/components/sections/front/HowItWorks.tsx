import PageHead from "@/components/layout/common/PageHead";
import css from "@/styles/sections/front/HowItWorks.module.css";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { memo } from "react";

function HowItWorks() {
  return (
    <div className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <PageHead
            alignTitle="left"
            alignSubtitle="left"
            title="How It Works"
            subtitle="WP Guard is designed to be user-friendly and effective. Here's how you can get started with our service:"
          />

          <div className={css.steps}>
            <div className={css.step}>
              <div className={css.icon}>
                <i className="bi bi-person-up"></i>
              </div>
              <div className={css.details}>
                <Typography variant="h6">Sign Up & Install Plugin</Typography>
                <Typography variant="body2">
                  Create an account on our website and install the WP Guard
                  plugin on your WordPress site.
                </Typography>
              </div>
            </div>
            <div className={css.step}>
              <div className={css.icon}>
                <i className="bi bi-gear"></i>
              </div>
              <div className={css.details}>
                <Typography variant="h6">Configure Maintenance</Typography>
                <Typography variant="body2">
                  Set up your maintenance preferences, including backup
                  schedules and security settings.
                </Typography>
              </div>
            </div>
            <div className={css.step}>
              <div className={css.icon}>
                <i className="bi bi-emoji-smile"></i>
              </div>
              <div className={css.details}>
                <Typography variant="h6">Enjoy Peace of Mind</Typography>
                <Typography variant="body2">
                  Sit back and relax while WP Guard protects your site from
                  threats.
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className={css.right}>
          <Image
            src="/images/wpguard-howitworks.png"
            alt="hero"
            width={700}
            height={700}
            priority
            className="z-10"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(HowItWorks);
