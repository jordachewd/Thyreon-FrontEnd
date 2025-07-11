import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null = null;

export default async function getStripe(): Promise<Stripe> {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }

  if (!stripePromise) {
    throw new Error("Failed to load Stripe");
  }

  return stripePromise;
}
