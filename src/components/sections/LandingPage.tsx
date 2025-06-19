import css from "@/styles/sections/LandingPage.module.css";
import Plans from "./Plans";
import Faqs from "./Faqs";

import Hero from "./Hero";

export default function LandingPage() {
  return (
    <section className={css.wrapper}>
      <Hero />
      <Plans />
      <Faqs />
    </section>
  );
}
