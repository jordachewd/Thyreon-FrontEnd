"use client";
import css from "@/styles/layout/front/Auth.module.css";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className={css.wrapper}>
      <SignUp />
    </section>
  );
}
