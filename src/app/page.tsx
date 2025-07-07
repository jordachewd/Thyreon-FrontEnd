import Header from "@/components/layout/front/Header";
import Footer from "@/components/layout/front/Footer";
import LandingPage from "@/components/layout/front/LandingPage";

export default async function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}
