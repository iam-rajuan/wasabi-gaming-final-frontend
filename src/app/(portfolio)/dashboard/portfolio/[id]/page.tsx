import PortfolioDetails from "@/app/(students)/dashboard/portfolio/_components/portfolio-details";

const PortfolioDetailPage = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <PortfolioDetails id={params.id} />
        </div>
    );
};

export default PortfolioDetailPage;
