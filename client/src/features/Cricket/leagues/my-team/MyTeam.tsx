import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../../shared/components/sidebar/Sidebar";
import TeamNav from "../components/teamNav";
import { Menu, X } from "lucide-react";

const MyTeam = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
      <TeamNav />
      <div className="flex">
        <div
          className={`${
            isSidebarOpen ? "w-[250px]" : "w-0"
          } h-[calc(100vh-100px)] transition-all duration-300 ease-in-out overflow-hidden`}
        >
      <Sidebar
        currentImage="../src/assets/images/indianLeague.png"
        className="left-0 top-[100px] h-full w-64 bg-[#1F1B2C] z-[1000]"
      />
        </div>

        <div
          className={`flex-1 h-[calc(100vh-100px)] bg-cover bg-left bg-no-repeat bg-[#081a37] text-white overflow-y-scroll transition-all duration-300 ease-in-out relative`}
          style={{
            backgroundImage:
              "url('../../../../../public/leagues/indianLeaguePage2.png')",
            backgroundSize: "fill",
            backgroundPosition: "left",
          }}
        >
            
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-50 p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyTeam;