import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { userId, priceId } = await req.json();

    if (!userId || !priceId) {
      return new NextResponse("Missing userId or priceId", { status: 400 });
    }

    // Get user from Firestore to see if they already have a customer ID
    // In a real app, verify authentication token here!
    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.data();

    // Base URL for success/cancel redirects
    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const customerId = userData?.stripeCustomerId;

    // Create session
    const session = await stripe.checkout.sessions.create({
      customer: customerId, // If null, Stripe creates a new customer
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
      success_url: `${origin}/pricing?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Internal Error: ${message}`, {
      status: 500,
    });
  }
}
