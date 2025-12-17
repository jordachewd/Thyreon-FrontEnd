import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import Faqs from "@/components/sections/common/Faqs";
import Plans from "@/components/sections/common/Plans";
import Features from "@/components/sections/public/Features";
import Hero from "@/components/sections/public/Hero";
import HowItWorks from "@/components/sections/public/HowItWorks";
import css from "@/styles/layout/public/LandingPage.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <section className={css.wrapper}>
        <Hero />
        <Features />
        <HowItWorks />
        <Plans className="py-14" />
        <Faqs className="pb-14" />
      </section>
      <Footer />
    </>
  );
}
