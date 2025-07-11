import css from "@/styles/layout/front/LandingPage.module.css";
import Plans from "../../sections/common/Plans";
import Faqs from "../../sections/common/Faqs";
import Hero from "../../sections/front/Hero";
import Features from "../../sections/front/Features";
import HowItWorks from "../../sections/front/HowItWorks";
// import getCurrentUser from "@/lib/actions/users/get-current-user";
import { GetUserData } from "@/types/users/get-user-data.d";

export default async function LandingPage() {
  // const profile = (await getCurrentUser()) as GetUserData;

  const userData: GetUserData | undefined = undefined;

/*   if (profile && !("statusCode" in profile && "error" in profile)) {
    userData = profile;
  } */

  return (
    <section className={css.wrapper}>
      <Hero />
      <Features />
      <HowItWorks />
      <Plans hasLoader={userData !== undefined} userData={userData} />
      <Faqs />
    </section>
  );
}
