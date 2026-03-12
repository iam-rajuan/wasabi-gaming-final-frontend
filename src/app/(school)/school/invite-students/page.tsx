import SubscriptionGuard from '@/components/shared/SubscriptionGuard'
import { RecentInvitations } from "./_components/recent-invitations";
import StartBuildingYourStudent from "./_components/start-building-your-student";
import InviteStudents from "./_components/invite-students";
import ShareInvitationLink from "./_components/share-invitation-link";

export default function InviteStudentsPage() {

    return (
        <SubscriptionGuard requireSubscription={true} requireLogin={true}>
            <main className="space-y-12 min-h-screen">

                <InviteStudents />
                <ShareInvitationLink />
                <RecentInvitations />
                <StartBuildingYourStudent />
            </main>
        </SubscriptionGuard>
    );
}
