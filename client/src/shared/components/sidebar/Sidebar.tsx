import cricketBat from "../../../assets/icons/cricket.svg";
import dice from "../../../assets/icons/dice.svg";
import results from "../../../assets/icons/results.svg";

import SidebarTab from "./components/SidebarTap";
import SidebarHeader from "./components/SidebarHeader";

const tabs = [
    { id: 1, title: "My Team", image: cricketBat, href: "/my-team" },
    {
        id: 2,
        title: "Pools",
        image: dice,
        href: "/my-team/pools",
    },
    {
        id: 3,
        title: "Results",
        image: results,
        href: "/my-team/results",
    },
];

interface SidebarProps {
    currentImage?: string;
    className?: string;
}

export default function Sidebar({
    currentImage,
    className = "",
}: SidebarProps) {
    return (
        <div
            className={`h-[calc(100vh-100px)] bg-slate-950 shadow-lg overflow-hidden transition-all ${className}`}
        >
            <SidebarHeader imageSrc={currentImage || ""} />
            <div className="flex flex-col gap-[15px] py-[30px] mx-5 border-t-[2px] border-gray-800">
                {tabs.map((tab) => (
                    <SidebarTab key={tab.id} {...tab} image={tab.image}/>
                ))}
            </div>
        </div>
    );
}
