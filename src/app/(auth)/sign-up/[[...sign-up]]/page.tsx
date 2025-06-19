import css from "@/styles/auth/AuthPage.module.css";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className={css.wrapper}>
      <SignUp />
    </section>
  );
}
