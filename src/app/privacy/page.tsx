"use client";

import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Source_Sans_3, Neuton } from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const neuton = Neuton({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function LegalRequirementPage() {
  const title = "Legal Requirement";
  const lastUpdated = "September 2025";

  return (
    <div className={`${sourceSans.className} bg-white min-h-screen`}>
      <Navbar />

      <div className="container mx-auto px-5 py-7 md:py-14">
        <main className="bg-white">
          {/* Title */}
          <h1
            className={`${neuton.className} text-center text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-6 md:mb-12`}
          >
            {title}
          </h1>

          {/* Body */}
          <div className="text-[13px] md:text-[14px] leading-[1.55] text-[#111]">
            <p className="mb-2 font-semibold text-xl text-[#505050]">
              Privacy Policy
            </p>

            <p className="mb-4 text-[#505050] font-semibold text-xl">
              Last updated: {lastUpdated}
            </p>

            {/* Section 1 */}
            <section className="mt-6">
              <h2
                className={`${neuton.className} text-xl text-[#363636] font-semibold mb-2 flex items-center`}
              >
                <span className="mr-2">1.</span> Who We Are
              </h2>

              <p className="mb-2 text-[#505050] font-semibold text-xl">
                The Aspiring Legal Network (ALN) is committed to protecting your
                privacy and handling your personal data securely and responsibly.
              </p>

              <p className="mb-2 text-[#505050] font-semibold text-xl">
                Our website address is: https://aspiringlegalnetwork.co.uk. If
                you have any questions about this policy or how we handle your
                data, please contact us at info@aspiringlegalnetwork.co.uk
              </p>
            </section>

            {/* Section 2 */}
            <section className="mt-4">
              <h2
                className={`${neuton.className} text-xl text-[#363636] font-semibold mb-2 flex items-center`}
              >
                <span className="mr-2">2.</span> Information We Collect
              </h2>

              <p className="mb-2 text-[#505050] font-semibold text-xl">
                We may collect and process the following information when you
                interact with our website:
              </p>

              <ul className="list-disc list-inside text-xl text-[#505050] font-semibold ml-4 mb-2">
                <li>
                  Information you provide directly, such as when you create an
                  account, register for events, or leave a comment (name, email,
                  etc.)
                </li>

                <li>
                  Cookies and usage data to improve your experience on the
                  website.
                </li>

                <li>
                  Uploaded content, such as images or documents you choose to
                  share.
                </li>

                <li>
                  If you leave a comment, an anonymised hash of your email may
                  be sent to Gravatar. See{" "}
                  <a
                    href="https://automattic.com/privacy/"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gravatar Privacy Policy
                  </a>
                  .
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mt-4">
              <h2
                className={`${neuton.className} text-xl text-[#363636] font-semibold mb-2 flex items-center`}
              >
                <span className="mr-2">3.</span> How We Use Your Data
              </h2>

              <p className="mb-2 text-[#505050] font-semibold text-xl">
                We process your personal data to:
              </p>

              <ul className="list-disc list-inside text-xl text-[#505050] font-semibold ml-4 mb-2">
                <li>Provide and improve our services.</li>

                <li>
                  Manage your account and support you as a community member.
                </li>

                <li>
                  Communicate with you about events, opportunities, and updates
                  where you have given consent.
                </li>

                <li>Comply with legal or regulatory obligations.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mt-4">
              <h2
                className={`${neuton.className} text-xl text-[#363636] font-semibold mb-2 flex items-center`}
              >
                <span className="mr-2">4.</span> Legal Basis for Processing Data
              </h2>

              <p className="mb-2 text-[#505050] font-semibold text-xl">
                Under UK GDPR, we must have a lawful reason for processing your
                data. ALN relies on:
              </p>

              <ul className="list-disc list-inside text-xl text-[#505050] font-semibold ml-4 mb-2">
                <li>Consent: When you sign up for email updates.</li>

                <li>Contract: When providing services you requested.</li>

                <li>Legal obligation: Where required by law.</li>

                <li>
                  Legitimate interests: Improving website & services without
                  overriding privacy rights.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mt-4">
              <h2
                className={`${neuton.className} text-xl text-[#363636] font-semibold mb-2 flex items-center`}
              >
                <span className="mr-2">5.</span> Cookies
              </h2>

              <p className="mb-2 text-[#505050] font-semibold text-xl">
                Cookies are small text files stored on your device to help our
                site function properly.
              </p>

              <p className="mb-2 text-[#505050] font-semibold text-xl">
                Examples of how we use cookies:
              </p>

              <ul className="list-disc list-inside text-xl text-[#505050] font-semibold ml-4 mb-2">
                <li>Remember your login details and preferences.</li>

                <li>
                  Save form information so you do not need to re-enter it later.
                </li>

                <li>
                  Monitor website performance and improve our services.
                </li>

                <li>
                  You can manage/disable cookies, but some features may not work
                  correctly without them.
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}