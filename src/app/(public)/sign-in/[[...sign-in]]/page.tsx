import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="auth-wrapper">
      <SignIn />
    </section>
  );
}
