import css from "@/styles/layout/front/LandingPage.module.css";
import Plans from "../../sections/common/Plans";
import Faqs from "../../sections/common/Faqs";
import Hero from "../../sections/front/Hero";
import Features from "../../sections/front/Features";
import HowItWorks from "../../sections/front/HowItWorks";

export default function LandingPage() {
  return (
    <section className={css.wrapper}>
      <Hero />
      <Features />
      <HowItWorks />
      <Plans className="py-14" />
      <Faqs className="pb-14" />
    </section>
  );
}
