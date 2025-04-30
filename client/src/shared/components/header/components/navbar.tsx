"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const pages = ["Home", "Tournaments", "Rules", "Support"]
const tournamentOptions = [' Indian Premier League']

export default function NavBar() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };

    const getPath = (page: string) => {
        return "/" + page.toLowerCase().replace(/\s+/g, "");
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target as Node)
            ) {
                setProfileDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav
            aria-label="Main navigation"
            className="lg:bg-slate-950 rounded-full px-12 h-[70px] flex items-center justify-between"
        >
            <div className="flex items-center space-x-12">
                {pages.map((item) =>
                    item === "Tournaments" ? (
                        <div key={item} className="relative" ref={dropdownRef}>
                            <button
                                className={transition-colors font-bold flex items-center ${
                                    currentPage.includes(getPath(item))
                                        ? "text-amber-500"
                                        : "text-white hover:text-orange-500 hover:underline"
                                }}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true"
                            >
                                {item}
                                <ChevronDown
                                    className={ml-1 h-4 w-4 transition-transform ${
                                        dropdownOpen ? "rotate-180" : ""
                                    }}
                                />
                            </button>
                        </div>
                    ) : (
                        <Link
                            key={item}
                            to={getPath(item)}
                            className={transition-colors font-bold ${
                                currentPage === getPath(item)
                                    ? "text-amber-500"
                                    : "text-white hover:text-orange-500 hover:underline"
                            }}
                            onClick={() => handlePageChange(getPath(item))}
                        >
                            {item}
                        </Link>
                    )
                )}
            </div>
        </nav>
    );
}
