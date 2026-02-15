"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-8 pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 serif-font">
          Privacy Policy
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <p className="text-sm text-gray-400">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>COOKHUB</strong> (&quot;we&quot;,
              &quot;our&quot;, or &quot;us&quot;). We are committed to
              protecting your personal information and your right to privacy. If
              you have any questions or concerns about our policy, or our
              practices with regards to your personal information, please
              contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you register on the website, express an interest in obtaining
              information about us or our products and services, when you
              participate in activities on the website (such as posting messages
              in our online forums or entering competitions, contests or
              giveaways) or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>
                <strong>Personal Data:</strong> Name, email address, and other
                contact info.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                website.
              </li>
              <li>
                <strong>Cookies:</strong> Verify you are not a bot and for
                authentication.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our website for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your orders.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. Sharing Your Information
            </h2>
            <p>
              We simply do not sell, trade, or otherwise transfer to outside
              parties your Personally Identifiable Information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Security of Your Information
            </h2>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Contact Us
            </h2>
            <p>
              If you have questions or comments about this policy, you may email
              us or contact us by post at:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl mt-4 border border-gray-100">
              <p className="font-bold text-gray-800">COOKHUB Inc.</p>
              <p>123 Recipe Street</p>
              <p>Foodie City, FC 90210</p>
              <p className="mt-2 text-primary">support@cookhub.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
