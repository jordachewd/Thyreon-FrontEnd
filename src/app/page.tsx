import Header from "@/components/front/Header";
import Footer from "@/components/front/Footer";
import LandingPage from "@/components/sections/LandingPage";

export default async function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}
