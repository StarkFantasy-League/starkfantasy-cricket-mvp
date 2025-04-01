import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../../../public/icons/logo.png";
import UserBlock from "../../../../shared/components/header/components/userBlock";
import { Menu, X } from "lucide-react";

const navlinks = [
    {
        link: "Home",
        path: "/",
    },
    {
        link: "About",
        path: "/about",
    },
    {
        link: "Tournaments",
        path: "/",
    },
    {
        link: "Rules",
        path: "/rules",
    },
    {
        link: "Support",
        path: "/support",
    },
];

const TeamNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-slate-950 h-[100px] relative z-[1000]">
            <nav className="flex justify-between items-center text-white px-4 h-full">
                <section className="flex items-center gap-[10px]">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-[100px] h-[100px]"
                    />
                    <p className="text-lg xl:text-[18px] text-white">
                        StarkFantasy League
                    </p>
                </section>

                <button
                    onClick={toggleMenu}
                    className="xl:hidden p-2 text-white z-50"
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul
                    className={`${
                        isMenuOpen
                            ? "flex flex-col absolute top-[100px] left-0 w-full bg-slate-950/95 backdrop-blur-sm"
                            : "hidden"
                    } xl:flex xl:items-center xl:justify-center xl:gap-[50px] xl:static xl:flex-row xl:bg-transparent xl:w-auto transition-all duration-300 ease-in-out z-40`}
                >
                    {navlinks.map((link, index) => (
                        <li
                            key={index}
                            className="px-9 py-2 xl:p-0 hover:bg-slate-800 xl:hover:bg-transparent"
                        >
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `block hover:text-amber-500 ${
                                        isActive ? "text-amber-500" : ""
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.link}
                            </NavLink>
                        </li>
                    ))}
                    <div className=" block pl-5 xl:hidden">
                        <UserBlock alternate />
                    </div>
                </ul>

                <div className=" hidden xl:block">
                    <UserBlock alternate />
                </div>
            </nav>
        </header>
    );
};

export default TeamNav;
