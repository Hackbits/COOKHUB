import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import Stripe from "stripe";

// Helper to find user by customer ID
async function getUserByCustomerId(customerId: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("stripeCustomerId", "==", customerId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return snapshot.docs[0];
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      return new NextResponse("Webhook Secret or Signature missing", {
        status: 400,
      });
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown Error";
    console.error(`Webhook signature verification failed: ${message}`);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const subscription = event.data.object as Stripe.Subscription;

  try {
    switch (event.type) {
      case "checkout.session.completed":
        // Retrieve the subscription details from Stripe
        const subscriptionId = session.subscription as string;
        if (!session?.metadata?.userId) {
          console.error("User ID missing in session metadata");
          break;
        }

        const userId = session.metadata.userId;
        const customerId = session.customer as string;

        await updateDoc(doc(db, "users", userId), {
          isPro: true,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          subscriptionStatus: "active",
        });
        break;

      case "invoice.payment_succeeded":
        // Verify user exists and is active
        // const subId = subscription.id;
        // Optionally update status if needed, usually managed by checkout.session.completed for initial
        break;

      case "customer.subscription.deleted":
      case "customer.subscription.updated":
        // Handle cancellation or status change
        const sub = await stripe.subscriptions.retrieve(subscription.id);
        const userDoc = await getUserByCustomerId(sub.customer as string);
        if (userDoc) {
          await updateDoc(doc(db, "users", userDoc.id), {
            isPro: sub.status === "active",
            subscriptionStatus: sub.status,
          });
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
