import React from "react";
import image1 from "../../../assets/images/image 7.png";

const Build = () => {
  return (
    <div className="bg-[#FFFFB9] flex flex-col lg:flex-row items-center justify-between relative  ">
      {/* content */}
      <div className="w-full lg:w-1/2 bg-[#FFFFB9]">
        <div className="lg:max-w-lg 2xl:max-w-3xl p-4 shadow-md  bg-white lg:rounded-xl lg:absolute 2xl:left-[15%] 2xl:top-[20%] ">
          <div className="space-y-4">
            <div className="space-y-4">
              <a rel="noopener noreferrer" href="#" className="block">
                <h3 className="text-5xl font-bold lg:text-2xl 2xl:text-5xl neuton ">
                  Build a standout CV that reflects your skills, ambition, and
                  future in law.
                </h3>
              </a>
              <p className="mb-10 base-color source">
                We provide 3+ professionally-vetted examples, drawn from a
                global pool of highly-rated resumes, so you know your content is
                effective.
              </p>

              <button
                type="button"
                className="px-4 py-2 font-bold rounded-2xl yellow main-color border-2 border-[#E5E500] text-base hover:bg-[#ffef12] transition duration-300 source "
              >
                Create Your Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* image */}
      <div className="w-full bg-white lg:w-1/2 ">
        <img src={image1.src} alt="" className="mx-auto " />
      </div>
    </div>
  );
};

export default Build;
