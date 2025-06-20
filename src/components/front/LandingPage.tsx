import css from "@/styles/front/LandingPage.module.css";
import Plans from "../sections/Plans";
import Faqs from "../sections/Faqs";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import HowItWorks from "../sections/HowItWorks";

export default function LandingPage() {
  return (
    <section className={css.wrapper}>
      <Hero />
      <Features />
      <HowItWorks />      
      <Faqs />
      <Plans />
    </section>
  );
}
