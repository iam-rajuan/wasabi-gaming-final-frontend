import React from "react";
import { Check, Zap, DollarSign, ArrowUp, Shield } from "lucide-react";

const PricingPage = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Starter Plan",
      price: "£29",
      billingCycle: "per month",
      description:
        "Start your journey with essential access to stay connected and explore real legal opportunities.",
      isPopular: false,
      features: [
        "Access to the ALN WhatsApp Community for advice and updates",
        "Invitations to free ALN events and partner sessions",
        "Access to AI Application Tracker for filtering opportunities",
        "Access to legal listings and insights",
        "Preview of one video course tutorial",
        "Regular updates on legal opportunities",
        "Access to the ALN Ambassador Programme",
        "Opportunity to join challenges and earn rewards",
        "24-hour free trial upgrade to explore Premium tools",
      ],
    },
    {
      id: 2,
      name: "Pro Plan",
      price: "£79",
      billingCycle: "per month",
      description:
        "Unlock the full ALN experience with exclusive tools, analytics, and advanced features designed to help you stand out.",
      isPopular: true,
      features: [
        "Unlimited use of all AI tools",
        "Video Courses with 5+ tutorials",
        "Access to all 40+ Law Firm Profiles and insights",
        "Personalised dashboard with progress tracking",
        "Enhanced access to the ALN Ambassador Programme",
      ],
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] py-20 flex flex-col items-center justify-center source">
      {/* Heading Section */}
      <h1 className="text-3xl font-bold text-center text-[#1D293D] md:text-4xl">
        Unlock Your Full Career Potential
      </h1>
      <p className="max-w-2xl mt-3 text-center text-[#45556C]">
        Choose a plan that fits your goals — access premium templates, AI
        feedback, and advanced tools to craft your perfect resume and stand out
        to employers.
      </p>

      <button className="mt-6 px-6 py-3 bg-[#FFFF00] hover:bg-[#f3df00] rounded-xl font-medium">
        Get Started
      </button>

      {/* Pricing Cards Wrapper */}
      <div className="grid items-start w-full max-w-5xl grid-cols-1 gap-8 px-4 mt-16 md:grid-cols-2">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 flex flex-col rounded-2xl shadow-sm bg-white border ${
              plan.isPopular
                ? "border-2 border-[#FFFF00] shadow-lg relative"
                : "border-gray-200"
            }`}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FFFF00] text-[#808000] text-xs font-bold px-3 py-2 rounded-full">
                Most Popular
              </span>
            )}

            <h2 className="text-lg font-semibold text-[#1D293D] text-center mb-2">
              {plan.name}
            </h2>
            <p className="mt-1 text-sm text-[#45556C] text-center">
              {plan.description}
            </p>

            {/* Price */}
            <div className="mt-5">
              <p className="text-3xl font-bold text-center text-[#C9C911]">
                {plan.price}
              </p>
              <p className="text-sm text-center mt-2 text-[#62748E]">
                {plan.billingCycle}
              </p>
            </div>

            {/* Features */}
            <ul className="mt-5 space-y-3 text-base text-[#314158]">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="text-[#2DC653] w-4 h-4 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <button
              className={`mt-8 w-full py-2 rounded-md font-medium transition ${
                plan.isPopular
                  ? "bg-[#FFFF00] hover:bg-[#f3df00]"
                  : "border border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
            >
              Choose Plan
            </button>

            {plan.isPopular && (
              <button className="w-full py-2 mt-3 font-medium text-[#808000] transition border border-[#E5E500] rounded-md hover:bg-[#E5E500] hover:text-white">
                24 hours free trial
              </button>
            )}
          </div>
        ))}
      </div>
      {/*  Why Subscribe Section */}
      <div className="w-full max-w-6xl px-4 mt-28">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#1D293D]">
          Why Subscribe?
        </h2>

        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center p-6 text-center bg-white border shadow-sm rounded-2xl">
            <div className="bg-[#FFFFDB] p-4 rounded-full">
              <Zap className="text-[#E5E500] w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mt-4 text-[#1D293D]">
              Instant Setup
            </h3>
            <p className="text-sm mt-2 text-[#45556C]">
              Get started in minutes with our streamlined onboarding process.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center p-6 text-center bg-white border shadow-sm rounded-2xl">
            <div className="bg-[#FFFFDB] p-4 rounded-full">
              <DollarSign className="text-[#E5E500] w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mt-4 text-[#1D293D]">
              Transparent Pricing
            </h3>
            <p className="text-sm mt-2 text-[#45556C]">
              No hidden fees. Pay only for what you use with clear pricing.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center p-6 text-center bg-white border shadow-sm rounded-2xl">
            <div className="bg-[#FFFFDB] p-4 rounded-full">
              <ArrowUp className="text-[#E5E500] w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mt-4 text-[#1D293D]">
              Upgrade Anytime
            </h3>
            <p className="text-sm mt-2 text-[#45556C]">
              Scale your plan as your practice grows without any hassle.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center p-6 text-center bg-white border shadow-sm rounded-2xl">
            <div className="bg-[#FFFFDB] p-4 rounded-full">
              <Shield className="text-[#E5E500] w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mt-4 text-[#1D293D]">
              Regular Updates & Security
            </h3>
            <p className="text-sm mt-2 text-[#45556C]">
              Stay protected with automatic updates and enterprise-grade
              security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
