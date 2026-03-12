import SchoolAboutMission from "../../components/about/school/SchoolAboutMission";
import SchoolAboutTitle from "../../components/about/school/SchoolAboutTitle";
import SchoolFounder from "../../components/about/school/SchoolFounder";
import SchoolOurValues from "../../components/about/school/SchoolOurValues";
import SchoolTeam from "../../components/about/school/SchoolTeam";

const SchoolAbout = () => {

  return (
    <div className="py-20 bg-[#FAFAFA]">
      <SchoolAboutTitle />
      <SchoolAboutMission />
      <SchoolFounder />
      <SchoolTeam />
      <SchoolOurValues />
    </div>
  );
};

export default SchoolAbout;