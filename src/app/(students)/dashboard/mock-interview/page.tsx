"use client";
import MockInterview from "./_components/mock-interview";
import Title from "./_components/title";
import WhyMockInterview from "./_components/why-mock-interview";
import SubscriptionGuard from "@/components/shared/SubscriptionGuard";

export default function MockInterviewPage() {
  return (
    <SubscriptionGuard requireSubscription={true} requireLogin={true} requiredPlan="premium" message="This AI feature requires a Premium membership">
      <div className="container mx-auto mt-16 space-y-10 mb-14 px-2 md:px-3 pb-20">
        <Title />

        <div>
          <MockInterview />
        </div>

        <div>
          <WhyMockInterview />
        </div>
      </div>
    </SubscriptionGuard>
  );
}
