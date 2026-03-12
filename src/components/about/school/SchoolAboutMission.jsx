import { ICONS } from "../../../assets";
import Icon from "../../shared/icon/Icon";

const schoolInfos = [
    {
      icon: ICONS.star,
      number: "100%",
      title: "Satisfaction rate",
    },
    {
      icon: ICONS.features,
      number: "10+",
      title: "Optimized features",
    },
    {
      icon: ICONS.euro,
      number: "$10M",
      title: "Revenue generated",
    },
    {
      icon: ICONS.usersBold,
      number: "5M",
      title: "Worldwide users",
    },
  ];
  
const SchoolAboutMission = () => {
  
  return (
    <div className="mt-16">
      <div className="max-w-[950px] mx-auto flex flex-col items-center rounded-2xl py-10 px-5 md:px-16 space-y-2 shadow-xl">
        <Icon icon={ICONS.messionIcon} radious="rounded-full" size={52} />
        <h1 className="text-3xl font-bold">Our mission</h1>
        <p className="text-[#5A5A5A] text-lg lg:text-2xl text-center pt-14">
          Aspiring brings together a passionate team of lawyers, apprentices,
          and career specialists united by a single goal—to make the path into
          law clearer and more achievable for everyone. With our combined
          expertise, we’ve created an innovative space where you can build your
          skills, refine your CV, and prepare for success with confidence. We
          know what it takes to get started, and we’re here to help you go
          further
        </p>
      </div>
      <div className="px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
        {schoolInfos.map((info) => (
          <div className="bg-white flex flex-col items-center py-5">
            <Icon icon={info.icon} radious="rounded-full" size={64} p={10} />
            <h4 className="text-center text-4xl font-bold text-[#1E1E1E] mt-8">
              {info.number}
            </h4>
            <p className="pt-2 text-base inter">{info.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolAboutMission;
