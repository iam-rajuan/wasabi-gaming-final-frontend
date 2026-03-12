"use client";
import CvMakingForm from './_components/cv-making-form'
import CvTips from './_components/cv-tips'
import SubscriptionGuard from "@/components/shared/SubscriptionGuard";

const page = () => {
  return (
    <SubscriptionGuard requireSubscription={true} requireLogin={true} requiredPlan="basic" message="Please choose a plan to access the CV Builder">
      <div className="container mx-auto px-2 py-4 md:px-6 mb-8 space-y-6">
        <CvMakingForm />
        <CvTips />
      </div>
    </SubscriptionGuard>
  )
}

export default page
