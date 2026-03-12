import React from "react";

const StudentAboutHeader = () => {
    return (
        <div className="p-6 mx-auto space-y-4 text-center">
            <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl font-['Neuton'] uppercase">
                About <span className="text-[#FFD700]">The Aspiring Legal Network</span>
            </h1>
            <p className="text-[#5A5A5A] text-lg lg:text-xl inter max-w-5xl justify-center mx-auto pt-7">
                The Aspiring Legal Network empowers future lawyers through events,
                resources, and an inclusive community. From solicitor apprenticeships to
                NQ roles, our AI-powered tools, mock interviews, and CV builders help
                you prepare, stand out, and succeed in law.
            </p>
        </div>
    );
};

export default StudentAboutHeader;
