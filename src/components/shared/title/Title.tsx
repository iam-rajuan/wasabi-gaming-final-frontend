import React from "react";

interface TitleProps {
    heading: string;
    description: string;
}

const Title: React.FC<TitleProps> = ({ heading, description }) => {
    return (
        <div className="space-y-4 text-center mb-8 lg:mb-16">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
                {heading}
            </h1>
            <p className="lg:text-xl text-[#666666]">
                {description}
            </p>
        </div>
    );
};

export default Title;
