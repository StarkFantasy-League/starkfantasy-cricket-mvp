"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useDisconnect } from "@starknet-react/core";

const pages = ["Home", "Tournaments", "Rules", "Support"]
const tournamentOptions = [' Indian Premier League']

export default function NavBar() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);

    // Starknet account hooks
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };

    const getPath = (page: string) => {
        return "/" + page.toLowerCase().replace(/\s+/g, "");
    };

    const handleDisconnect = () => {
        disconnect();
        localStorage.clear();
        setProfileDropdownOpen(false);
    };

    // Format address for display
    const getFormattedAddress = () => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
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

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

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
                                className={`transition-colors font-bold flex items-center ${
                                    currentPage.includes(getPath(item))
                                        ? "text-amber-500"
                                        : "text-white hover:text-orange-500 hover:underline"
                                }`}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                                aria-haspopup="true"
                            >
                                {item}
                                <ChevronDown
                                    className={`ml-1 h-4 w-4 transition-transform ${
                                        dropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    ) : (
                        <Link
                            key={item}
                            to={getPath(item)}
                            className={`transition-colors font-bold ${
                                currentPage === getPath(item)
                                    ? "text-amber-500"
                                    : "text-white hover:text-orange-500 hover:underline"
                            }`}
                            onClick={() => handlePageChange(getPath(item))}
                        >
                            {item}
                        </Link>
                    )
                )}
            </div>

            {/* Wallet Section with debug info */}
            <div>
                {isConnected && (
                    <div className="relative" ref={profileDropdownRef}>
                        <button
                            className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full flex items-center space-x-2"
                            onClick={toggleProfileDropdown}
                        >
                            <span>{getFormattedAddress()}</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                    profileDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <AnimatePresence>
                            {profileDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                    className="absolute right-0 mt-2 w-48 bg-slate-950 rounded-lg shadow-lg py-2 z-10 border border-slate-700"
                                >
                                    <button
                                        className="w-full text-left px-4 py-2 text-white hover:text-orange-500 hover:bg-slate-800 transition-colors flex items-center"
                                        onClick={handleDisconnect}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Disconnect Wallet
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </nav>
    );
}
