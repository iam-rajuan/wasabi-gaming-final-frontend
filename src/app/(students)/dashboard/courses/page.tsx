"use client";
import AllCourse from "./_components/all-course";
import SubscriptionGuard from "@/components/shared/SubscriptionGuard";

export default function Page() {
    return (
        <SubscriptionGuard requireSubscription={true} requireLogin={true} requiredPlan="premium" message="Learning Pathways require a Premium membership">
            <div>
                <AllCourse />
            </div>
        </SubscriptionGuard>
    );
}
