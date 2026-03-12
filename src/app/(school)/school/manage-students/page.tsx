import SubscriptionGuard from '@/components/shared/SubscriptionGuard'
import ManageStudentsHeader from "@/components/school/student-management/ManageStudentsHeader";
import ManageStudentsTable from "@/components/school/student-management/ManageStudentsTable";
import NeedHelpSection from "@/components/school/student-management/NeedHelp";

export const metadata = {
    title: "Manage Students | Aspiring",
    description: "Track and monitor student career journeys.",
};

export default function ManageStudentsPage() {
    return (
        <SubscriptionGuard requireSubscription={true} requireLogin={true}>
            <div>
                <ManageStudentsHeader />
                <main className="max-w-[1600px] mx-auto pb-20">
                    <ManageStudentsTable />
                </main>
                <NeedHelpSection />
            </div>
        </SubscriptionGuard>
    );
}
