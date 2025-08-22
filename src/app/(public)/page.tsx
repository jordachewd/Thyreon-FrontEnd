import Footer from "@/components/layout/front/Footer";
import Header from "@/components/layout/front/Header";
import Faqs from "@/components/sections/common/Faqs";
import Plans from "@/components/sections/common/Plans";
import Features from "@/components/sections/front/Features";
import Hero from "@/components/sections/front/Hero";
import HowItWorks from "@/components/sections/front/HowItWorks";
import css from "@/styles/layout/front/LandingPage.module.css";


export default async function Home() {
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
