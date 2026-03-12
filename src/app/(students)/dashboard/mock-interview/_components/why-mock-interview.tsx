import { Brain, CircleCheckBig } from "lucide-react";
import React from "react";

const WhyMockInterview = () => {
  const benefits = [
    "Discover your natural cognitive strengths and abilities",
    "Get personalised career recommendations based on your results",
    "Stand out to employers with verified test scores on your profile",
  ];

  return (
    <section className="bg-gradient-to-br from-[#FAF5FF] to-[#FFFFFF] border-[2px] border-[#E9D4FF] rounded-[20px] p-8">
      <div className="flex items-start gap-3">
        <div className="bg-[#AD46FF] p-4 rounded-[20px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-semibold text-[#1E1E1E] mb-2">
            Why Take A Mock Interview?
          </h2>
          <ul className="space-y-2">
            {benefits.map((text, index) => (
              <li key={index} className="flex items-center gap-3">
                <CircleCheckBig className="w-5 h-5 text-[#9810FA] flex-shrink-0" />
                <span className="text-sm md:text-base text-[#364153] font-normal">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyMockInterview;
