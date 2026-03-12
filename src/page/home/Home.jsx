import { useState, useEffect } from "react";
import SchoolHome from "./School/SchoolHome";
import StudentHome from "./student/StudentHome";
import { secureStorage } from "../../utils/secureStorage";
import { ActiveSection } from "../../constant/navConstant";

const Home = () => {
  const [activeSection, setActiveSection] = useState(
    secureStorage.getItem("activeSection") || ActiveSection.Students
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const storedSection =
        secureStorage.getItem("activeSection") || ActiveSection.Students;
      if (storedSection !== activeSection) {
        setActiveSection(storedSection);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [activeSection]);

  return (
    <div>{activeSection === ActiveSection.School ? <SchoolHome /> :  <StudentHome />}</div>
  );
};

export default Home;
