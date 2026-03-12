import PortfolioEvents from "@/app/(students)/dashboard/portfolio/_components/portfolio-events";
import PortfolioHero from "@/app/(students)/dashboard/portfolio/_components/portfolio-hero";

export default function PortfolioPage() {
    return (
        <div className="bg-[#FEFDF6]">
            <PortfolioHero />
            <PortfolioEvents />
        </div>
    );
}
