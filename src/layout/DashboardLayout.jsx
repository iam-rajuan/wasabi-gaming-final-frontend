import { Outlet } from "react-router-dom";
import StudentFooter from "../components/shared/StudentFooter";
import StudentNavbar from "../components/shared/StudentNavbar";

const DashboardLayout = () => {
  return (
    <div>
      <StudentNavbar />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <StudentFooter />
    </div>
  );
};

export default DashboardLayout;
