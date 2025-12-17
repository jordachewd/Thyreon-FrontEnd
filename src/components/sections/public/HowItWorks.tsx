import PageHead from "@/components/layout/common/PageHead";
import { Typography } from "@/components/ui";
import Image from "next/image";

export default function HowItWorks() {
  return (
    <div className="flex flex-col w-full p-4 bg-vanilla-200 dark:bg-midnight-700">
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-6xl mx-auto lg:gap-12 lg:my-10">
        <div className="flex flex-1 w-full flex-col gap-12 order-2 lg:order-1 mb-10 lg:mb-0">
          <PageHead
            alignTitle="left"
            title="How It Works"
            subtitle="WP Guard is designed to be user-friendly and effective. Here's how you can get started with our service:"
          />

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-8">
              <div className="bg-leaf-green-400 text-white text-3xl w-16 h-16 flex items-center justify-center rounded-full">
                <i className="bi bi-person-up"></i>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Typography variant="h6">Sign Up & Install Plugin</Typography>
                <Typography variant="body2">
                  Create an account on our website and install the{" "}
                  <b>WP Guard Client</b> on your WordPress site.
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="bg-leaf-green-400 text-white text-3xl w-16 h-16 flex items-center justify-center rounded-full">
                <i className="bi bi-gear"></i>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Typography variant="h6">Configure Maintenance</Typography>
                <Typography variant="body2">
                  Set up your maintenance preferences, including backup
                  schedules and security settings.
                </Typography>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="bg-leaf-green-400 text-white text-3xl w-16 h-16 flex items-center justify-center rounded-full">
                <i className="bi bi-emoji-smile"></i>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Typography variant="h6">Enjoy Peace of Mind</Typography>
                <Typography variant="body2">
                  Sit back and relax while WP Guard protects your site from
                  threats.
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 w-full overflow-hidden self-end justify-center order-1 lg:order-2">
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
