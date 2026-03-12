import StudentNavbar from "@/components/shared/StudentNavbar";
import Footer from "@/components/shared/Footer";

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <StudentNavbar />
            <main className="flex-1 bg-[#FEFDF6]">{children}</main>
            <Footer />
        </div>
    );
}
