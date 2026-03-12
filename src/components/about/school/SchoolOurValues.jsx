import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Title from "../../shared/title/Title";

const valuesData = [
  {
    title: "Equal Access",
    description:
      "We believe everyone deserves a fair start. Aspiring breaks down barriers by making guidance and opportunities simple, clear, and accessible to all.",
    icon: "⚖️",
  },
  {
    title: "Mutual Respect",
    description:
      "We value every user equally. Respect means listening, protecting your privacy, and creating a safe space for everyone to grow.",
    icon: "🛡️",
  },
  {
    title: "Support and Guidance",
    description:
      "At Aspiring, we provide guidance, mentorship, and support to help individuals navigate their career journeys successfully.",
    icon: "💬",
  },
  {
    title: "Collaboration",
    description:
      "We thrive on teamwork, connecting people to achieve collective success.",
    icon: "🤝",
  },
  {
    title: "Integrity",
    description:
      "We hold ourselves accountable to the highest ethical standards.",
    icon: "💎",
  },
];

const SchoolOurValues = () => {
  return (
    <div className="px-6 pt-16 neuton">
      <div className="md:max-w-[1000px] mx-auto">
        <Title
          heading={"Our Values"}
          description={
            "At Aspiring, we’re guided by values that go beyond career tools — they define how we empower, connect, and support every individual on their journey into law"
          }
        />
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1} // Default for mobile screens
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1000}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {valuesData.map((value, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between text-center h-full min-h-[280px] transition-transform duration-300 hover:scale-105 my-8 neuton">
              {/* Icon */}
              <div className="mb-4 text-5xl">{value.icon}</div>

              {/* Title + Description group (grow together) */}
              <div className="flex flex-col justify-center flex-grow">
                <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                <p className="text-base text-gray-600">{value.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SchoolOurValues;
