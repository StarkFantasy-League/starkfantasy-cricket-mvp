import cricketBat from "../../../assets/icons/cricket.svg";
import dice from "../../../assets/icons/dice.svg";
import results from "../../../assets/icons/results.svg";

import SidebarTab from "./components/SidebarTap";
import SidebarHeader from "./components/SidebarHeader";
import { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Menu } from "lucide-react";
import { useEffect } from "react";

const tabs = [
    { id: 1, title: "My Team", image: cricketBat, href: "my-team" },
    {
        id: 2,
        title: "Pools",
        image: dice,
        href: "pools",
    },
    {
        id: 3,
        title: "Results",
        image: results,
        href: "results",
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
        <div className={`relative`}>
            <div
                className={` ${
                    isSidebarOpen ? "w-[250px]" : "w-0"
                } h-[calc(100vh-100px)] transition-all duration-300 ease-in-out overflow-hidden`}
            >
                <div
                    className={`h-[calc(100vh-100px)] bg-slate-950 shadow-lg overflow-hidden transition-all ${className}`}
                >
                    <SidebarHeader imageSrc={currentImage || ""} />
                    <div className="flex flex-col gap-[15px] py-[30px] mx-5 border-t-[2px] border-gray-800">
                        {tabs.map((tab) => (
                            <SidebarTab
                                key={tab.id}
                                {...tab}
                                image={tab.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <button
                onClick={toggleSidebar}
                className="absolute top-0 left-4 z-50 p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-700 transition-colors"
            >
                {isSidebarOpen ? (
                    <HiOutlineArrowLeft size={20} />
                ) : (
                    <Menu size={24} />
                )}
            </button>
        </div>
    );
}
