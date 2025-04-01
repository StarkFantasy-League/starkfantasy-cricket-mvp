import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface SidebarTabProps {
    title: string;
    image: string;
    href: string;
    isLast?: boolean;
}

export default function SidebarTab({ title, image, href }: SidebarTabProps) {
    const location = useLocation().pathname;

    const isActive = location === href;

    return (
        <div className="relative">
            <NavLink
                to={href}
                className={` ${
                    isActive
                        ? " bg-orange-500 hover:bg-orange-500"
                        : " bg-transparent hover:bg-gray-900/90 "
                } flex items-center p-[6px] gap-2  rounded-[10px] transition`}
            >
                <img src={image} alt="icons" className=" w-8 h-8" />
                <span className="text-white font-normal text-lg ml-3">
                    {title}
                </span>
            </NavLink>
        </div>
    );
}
