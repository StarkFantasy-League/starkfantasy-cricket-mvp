import React, { useState } from "react";
import { useRef } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface UserBlockProps {
    balance?: string;
    connect?: string;
    profile?: string;
    alternate?: boolean;
}

const UserBlock: React.FC<UserBlockProps> = ({
    balance = "0.00000 STRK",
    connect = "Connect Wallet",
    profile = "../../../src/assets/icons/user.png",
    alternate = false,
}) => {
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Starknet account hooks
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const handleDisconnect = () => {
        disconnect();
        localStorage.clear();
        setProfileDropdownOpen(false);
        navigate("/");
    };

    // Format address for display
    const getFormattedAddress = () => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    return (
        <div className="flex items-center">
            <div
                className={`${
                    alternate && "border-transparent"
                } w-fit lg:border-2 p-2 justify-center flex gap-5 items-center bg-slate-950 rounded-full hover:opacity-90 transition-opacity border-indigo-900`}
            >
                <div className="hidden xl:block">
                    {/* connected to the wallet */}
                    {isConnected ? (
                        <>
                            <div className="relative" ref={profileDropdownRef}>
                                <button
                                    className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full flex items-center space-x-2"
                                    onClick={toggleProfileDropdown}
                                >
                                    <span>{getFormattedAddress()}</span>
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${
                                            profileDropdownOpen
                                                ? "rotate-180"
                                                : ""
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
                            <div className="text-white text-sm px-4 text-center w-[120px] py-2 border-[5px]  border-slate-950 rounded-full bg-[#FF9500] ml-2">
                                {balance}
                            </div>
                        </>
                    ) : (
                        <div
                            className={${
                                alternate && "border-[#312C85]"
                            } text-white text-sm px-4 text-center min-w-[150px] py-2 border-[5px] border-slate-950 rounded-full ${
                                isConnected
                                    ? "bg-[#FF9500]"
                                    : "bg-black hover:cursor-not-allowed opacity-50"
                            } ml-2}
                        >
                            {connect}
                        </div>
                    )}
                </div>

                <button
                    className={w-fit rounded-full disabled:opacity-50 disabled:cursor-not-allowed}
                    disabled={!isConnected}
                >
                    <img
                        className="w-10 h-10 rounded-full border-2 border-purple-800"
                        src={profile}
                        alt="Profile Logo"
                    />
                </button>
            </div>
        </div>
    );
};

export default UserBlock;