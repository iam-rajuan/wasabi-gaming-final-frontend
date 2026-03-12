'use client';

import image2 from "../../../assets/images/b.jpeg";
import image3 from "../../../assets/images/sponser2.jpeg";
import image4 from "../../../assets/images/sponser3.jpeg";
import image5 from "../../../assets/images/sponser4.png";
import image6 from "../../../assets/images/sponser5.jpeg";

const Sponser = () => {
  const images = [image2, image3, image4, image5, image6, image2, image3, image4, image5, image6, image2, image3, image4, image5, image6];

  return (
    <div className="py-16 overflow-hidden bg-white">
      <div className="relative w-full flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {images.map((img, index) => (
            <img key={index} src={img.src} alt="sponsor" className="mx-8 h-24 inline-block" />
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
          {images.map((img, index) => (
            <img key={`dup-${index}`} src={img.src} alt="sponsor" className="mx-8 h-24 inline-block" />
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
       `}</style>
    </div>
  );
};

export default Sponser;
