"use client";
import PsychometricAssessment from "@/components/student/psychometric/PsychometricAssessment";
import SubscriptionGuard from "@/components/shared/SubscriptionGuard";

export default function PsychometricPage() {
    return (
        <SubscriptionGuard requireSubscription={true} requireLogin={true} requiredPlan="premium" message="Psychometric tests require a Premium membership">
            <main>
                <PsychometricAssessment />
            </main>
        </SubscriptionGuard>
    );
}
