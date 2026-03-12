import RoleGuard from "@/components/shared/RoleGuard";
import StudentNavbar from "@/components/shared/StudentNavbar";
import Footer from "@/components/shared/Footer";
import SubscriptionErrorHandler from "@/components/shared/SubscriptionErrorHandler";

export default function StudentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRole="student">
            <SubscriptionErrorHandler />
            <div className="flex flex-col min-h-screen">
                <StudentNavbar />
                <main className="flex-1 bg-[#FAFAFA]">{children}</main>
                <Footer />
            </div>
        </RoleGuard>
    );
}
