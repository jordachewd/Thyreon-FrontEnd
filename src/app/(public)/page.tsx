import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import Faqs from "@/components/sections/common/Faqs";
import Plans from "@/components/sections/common/Plans";
import Features from "@/components/sections/public/Features";
import Hero from "@/components/sections/public/Hero";
import HowItWorks from "@/components/sections/public/HowItWorks";
import getCurrentUser from "@/lib/actions/users/get-current-user";
import css from "@/styles/layout/public/LandingPage.module.css";

export const dynamic = "force-dynamic"; // Ensure the page is always server-side rendered

export default async function Home() {
  const user = await getCurrentUser();
  console.log("Current User on Landing Page:", user);

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
