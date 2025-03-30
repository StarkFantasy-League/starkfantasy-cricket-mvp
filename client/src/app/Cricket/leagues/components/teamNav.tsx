import { NavLink } from "react-router-dom";
import logo from "../../../../../public/icons/logo.png";
import UserBlock from "../../../../components/header/components/userBlock";

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
        path: "#",
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
    return (
        <header className=" bg-slate-950 h-[100px]">
            <nav className=" flex justify-between text-white">
                <section className=" flex items-center gap-[10px]">
                    <img
                        src={logo}
                        alt="logo"
                        className=" w-[100px] h-[100px]"
                    />
                    <p className=" text-5 text-white">StarkFantasy League</p>
                </section>

                <ul className=" flex items-center justify-center gap-[50px]">
                    {navlinks.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.path}
                                className=" hover:text-amber-500"
                            >
                                {link.link}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <UserBlock alternate/>
            </nav>
        </header>
    );
};

export default TeamNav;
