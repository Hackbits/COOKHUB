"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useUserStore } from "@/store/useUserStore";

const PRICE_ID = "price_1Q..."; // Replace with real price ID or env var

export default function PricingPage() {
  const user = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user?.isLoggedIn) {
      // Prompt login or redirect
      alert("Please log in to upgrade.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.firebaseUid,
          priceId: PRICE_ID,
        }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        console.error("No checkout URL returned");
        alert("Failed to start checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Upgrade to CookHub Pro
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Unlock premium features and take your cooking to the next level.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <div className="text-4xl font-extrabold text-gray-900 mb-6">
              $0<span className="text-lg text-gray-500 font-normal">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-center gap-3 text-gray-600">
                <Check className="text-green-500" size={20} />
                Access to all public recipes
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Check className="text-green-500" size={20} />
                Save favorite recipes
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Check className="text-green-500" size={20} />
                Shopping list
              </li>
            </ul>
            <Button variant="outline" className="w-full py-6 text-lg" disabled>
              Current Plan
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-primary/5 p-8 rounded-2xl shadow-lg border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Popular
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
            <div className="text-4xl font-extrabold text-gray-900 mb-6">
              $9<span className="text-lg text-gray-500 font-normal">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-center gap-3 text-gray-900 font-medium">
                <Check className="text-primary" size={20} />
                All Free features
              </li>
              <li className="flex items-center gap-3 text-gray-900 font-medium">
                <Check className="text-primary" size={20} />
                AI Recipe Refactor (Unlimited)
              </li>
              <li className="flex items-center gap-3 text-gray-900 font-medium">
                <Check className="text-primary" size={20} />
                Nutritional Analysis
              </li>
              <li className="flex items-center gap-3 text-gray-900 font-medium">
                <Check className="text-primary" size={20} />
                Priority Support
              </li>
            </ul>
            <Button
              onClick={handleUpgrade}
              disabled={loading || user?.isPro}
              className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20"
            >
              {loading
                ? "Processing..."
                : user?.isPro
                  ? "Active Plan"
                  : "Upgrade Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
