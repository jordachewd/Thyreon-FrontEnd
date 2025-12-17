import { NODE_ENV } from "@/constants/api/node-env.const";
import { Typography, Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex w-full justify-between items-center pt-14 px-4 bg-vanilla-200 dark:bg-midnight-700 shadow-sm">
      <div className="flex flex-col lg:flex-row justify-between lg:mt-12 pb-12 lg:pb-0 lg:gap-40 mx-auto max-w-screen-2xl items-center">
        <div className="flex w-full lg:w-1/2 relative flex-col gap-12 items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <Typography variant="h2">WordPress Maintenance Made Easy</Typography>

          <Typography variant="h5">
            Keep your WordPress site secure and up-to-date with automated
            maintenance amoring.
          </Typography>

          <Link href="/sign-up">
            <Button
              size="large"
              variant="primary"
              disabled={NODE_ENV !== "development"}
            >
              Get Started
            </Button>
          </Link>
        </div>

        <div className="flex w-full lg:w-1/2 relative self-end justify-center order-1 lg:order-2 sm:min-h-125 xl:min-h-150 xxl:min-h-175">
          <Image
            src="/images/wpguard-lp-hero.png"
            alt="hero"
            width={700}
            height={700}
            priority
            className="z-10"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] z-0 rounded-full bg-vanilla-600 dark:bg-midnight-300 blur-3xl">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
