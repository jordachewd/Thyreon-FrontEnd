import Header from "@/components/front/Header";
import Footer from "@/components/front/Footer";
import LandingPage from "@/components/front/LandingPage";
import getUsers from "@/lib/actions/users/get-users";
import { GetUserData } from "@/types/get-user-data.d";

export default async function Home() {
  const users = (await getUsers()) as GetUserData[];
  console.log("Fetched users:", users);

  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}
