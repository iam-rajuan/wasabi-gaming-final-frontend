import RoleGuard from "@/components/shared/RoleGuard";
import SchoolNavbar from "@/components/shared/SchoolNavbar";
import Footer from "@/components/shared/Footer";
import SubscriptionErrorHandler from "@/components/shared/SubscriptionErrorHandler";

export default function SchoolLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRole="school">
            <SubscriptionErrorHandler />
            <div className="flex flex-col min-h-screen">
                <SchoolNavbar />
                <main className="flex-1 bg-[#FAFAFA]">{children}</main>
                <Footer />
            </div>
        </RoleGuard>
    );
}
