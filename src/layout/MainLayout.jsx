import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { IMAGES } from "../assets";

const MainLayout = () => {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact-us";

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`relative ${isContactPage ? "min-h-screen" : ""} bg-[#FAFAFA]`}
        style={{
          backgroundImage: isContactPage
            ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${IMAGES.contact})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Optional: translucent dark layer with backdrop blur */}
        {/* <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" /> */}

        <Navbar />

        {/* Content layer */}
        <div className={`${isContactPage ? "relative z-10" : ""}`}>
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
