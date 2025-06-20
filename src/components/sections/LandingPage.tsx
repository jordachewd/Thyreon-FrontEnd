import css from "@/styles/sections/LandingPage.module.css";
import Plans from "./Plans";
import Faqs from "./Faqs";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";

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
