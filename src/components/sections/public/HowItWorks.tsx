import PageHead from "@/components/layout/common/PageHead";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import css from "@/styles/sections/public/HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <div className={css.section}>
      <div className={css.content}>
        <div className={css.left}>
          <PageHead
            alignTitle="left"
            title="How It Works"
            subtitle="Thyreon is designed to be user-friendly and effective. Here's how you can get started with our service:"
          />

          <div className={css.steps}>
            <div className={css.step}>
              <div className={css.icon}>
                <i className="bi bi-person-up"></i>
              </div>
              <div className={css.details}>
                <Typography variant="h6">Sign Up & Install Plugin</Typography>
                <Typography variant="body2">
                  Create an account on our website and install the{" "}
                  <b>Thyreon WP Client</b> on your WordPress site.
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
                  Sit back and relax while <b>Thyreon</b> protects your site from
                  threats.
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className={css.right}>
          <Image
            src="/images/how-it-works.png"
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
