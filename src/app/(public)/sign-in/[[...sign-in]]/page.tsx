import css from "@/styles/layout/public/Auth.module.css";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className={css.wrapper}>
      <SignIn />
    </section>
  );
}
