import image from "../../../assets/images/dashboard-image.png";
import React from "react";
import { ContainerScroll } from "../../ui/container-scroll-animation";
const DashboardDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto text-center bg-[#FEFEF9] ">
      <ContainerScroll className="dashboard-image">
        <div>
          <img src={image.src} alt="" />
        </div>
      </ContainerScroll>

      <div className="flex flex-col items-center mt-8">
        <h1 className="w-2/3 text-5xl font-semibold main-color neuton">
          Learn Everything You Need to Know About a Career in Law
        </h1>

        <p className="w-2/3 mt-8 base-color source ">
          Our video learning course helps you understand the legal profession
          and guides you through every stage of the application process, from
          exploring different career paths to preparing strong, confident
          applications.
        </p>
        <button
          type="button"
          className="px-4 py-2 font-bold rounded-2xl yellow main-color border-2 border-[#E5E500] text-base hover:bg-[#ffef12] transition duration-300 source mt-9  mb-4"
        >
          Start Watching Now
        </button>
      </div>
    </div>
  );
};

export default DashboardDemo;
