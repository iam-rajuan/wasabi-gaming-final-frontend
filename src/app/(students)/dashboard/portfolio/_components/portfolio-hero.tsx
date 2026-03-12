import React from "react";

const PortfolioHero = () => {
    return (
        <section className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center z-0 "
                style={{
                    backgroundImage: "url('/portfolioHero.jpg')",
                }}
            />
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        "linear-gradient(155.95deg, rgba(44, 44, 44, 0.7) -7.01%, rgba(64, 64, 64, 0.56) 113.57%)",
                }}
            />

            {/* Text Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
                    Portfolio
                </h1>
                <p className="text-white/90 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
                    Have a look into our portfolio and discover the work, partnerships, and impact driving the future of legal talent.
                </p>
            </div>

        </section>
    );
};

export default PortfolioHero;
