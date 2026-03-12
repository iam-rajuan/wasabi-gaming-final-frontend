"use client";
import { CoverLetterBuilder } from "./_components/CoverLetterBuilder"
import SubscriptionGuard from "@/components/shared/SubscriptionGuard";

export default function Home() {
  return (
    <SubscriptionGuard requireSubscription={true} requireLogin={true} requiredPlan="premium" message="This AI feature requires a Premium membership">
      <main className="min-h-screen bg-white py-8 px-2 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <CoverLetterBuilder />
        </div>
      </main>
    </SubscriptionGuard>
  )
}
