import React from "react";
import Title from "../_components/title";
import DetailsLayout from "./_components/details-layout";

const page = () => {
  return (
    <div className="container mt-5 mb-10 space-y-6">
      <Title />

      <div className="w-full h-[1px] bg-black"></div>

      <div>
        <DetailsLayout />
      </div>
    </div>
  );
};

export default page;
