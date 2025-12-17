"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="auth-wrapper">
      <SignUp />
    </section>
  );
}
