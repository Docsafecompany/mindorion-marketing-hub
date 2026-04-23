import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51SlUgZPRgRrg8XxApnDcwZgdWe2R2RHX7xXcnCaJr4ViltHx3SQRiGec7aNsyfcYAlCb28c2qfI6enVkE262bzcW00dn5lKgiY"
);

export type BillingCycle = "monthly" | "annual";
export type PlanId = "starter" | "pro" | "business";
export type ProductId = "qualion" | "prospectiq";

const PRICE_IDS: Record<ProductId, Record<PlanId, Record<BillingCycle, string>>> = {
  qualion: {
    starter: {
      monthly: "price_1TLPIYPRgRrg8XxA4hWlXxrW",
      annual: "price_1TLPQkPRgRrg8XxAqxMDeTQu",
    },
    pro: {
      monthly: "price_1TPA5sPRgRrg8XxAzShRwhNR",
      annual: "price_1TPA6IPRgRrg8XxA8mTgEQn5",
    },
    business: {
      monthly: "price_1TLPKSPRgRrg8XxAkb2Uep0s",
      annual: "price_1TLPMBPRgRrg8XxAVHmo0QQr",
    },
  },
  prospectiq: {
    starter: {
      monthly: "price_1TN0vTPRgRrg8XxAzjRbgLdF",
      annual: "price_1TN0wJPRgRrg8XxA6gjahwBt",
    },
    pro: {
      monthly: "price_1TN0wqPRgRrg8XxAD3bnMQtu",
      annual: "price_1TN0xIPRgRrg8XxAYtJAiUbw",
    },
    business: {
      monthly: "price_1TN0xiPRgRrg8XxAG7GLpihz",
      annual: "price_1TN0y3PRgRrg8XxAQXuLmtf9",
    },
  },
};

export async function redirectToCheckout(
  product: ProductId,
  plan: PlanId,
  cycle: BillingCycle
) {
  const stripe = await stripePromise;
  if (!stripe) return;

  const priceId = PRICE_IDS[product][plan][cycle];

  await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    successUrl: "https://app.mindorion.com/dashboard?checkout=success",
    cancelUrl: "https://mindorion.com/pricing?checkout=cancelled",
  });
}
