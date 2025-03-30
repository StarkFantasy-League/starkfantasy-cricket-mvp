import { Outlet } from "react-router-dom";
import Sidebar from "../../../../components/sidebar/Sidebar";
import TeamNav from "../components/teamNav";
const MyTeam = () => {
    return (
        <div className="">
            <TeamNav />
            <div className="grid grid-cols-[250px_1fr]">
                <Sidebar />
                <div
                    className="h-[calc(100vh-100px)] bg-cover bg-left bg-no-repeat bg-[#081a37] w-full text-white overflow-y-scroll"
                    style={{
                        backgroundImage:
                            "url('../../../../../public/leagues/indianLeaguePage2.png')",
                            backgroundSize: "fill",
                        backgroundPosition: "left",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
