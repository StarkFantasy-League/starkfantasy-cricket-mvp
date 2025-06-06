import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UpcomingMatches from "../../components/upcomingMatches";
import PerformanceStats from "../../components/performanceStats";
import TopScorers from "../../components/topScorers";
import { useHomeData } from "../../../../../hooks/useHomeData";
import { LoaderCircle } from "lucide-react";


const Home = () => {
    const { homeData, isLoadingHomeData } = useHomeData();

    const [user, setUser] = useState({
        isConnected: true,
        walletAddress: "0x1234abcd5678efgh",
    });

    const [showWelcome, setShowWelcome] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        if (user.isConnected) {
            const fadeOutTimer = setTimeout(() => {
                setFadeOut(true);
            }, 4000);

            const switchTimer = setTimeout(() => {
                setShowWelcome(false);
                setFadeIn(true);
            }, 5000);

            const fadeInTimer = setTimeout(() => {
                setFadeIn(false);
            }, 6000);

            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(switchTimer);
                clearTimeout(fadeInTimer);
            };
        } else {
            setShowWelcome(false);
        }
    }, [user.isConnected]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
                delayChildren: 0.3,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="relative z-20  w-full h-full">
            {user.isConnected ? (
                showWelcome ? (
                    <motion.div
                        className={`text-center flex flex-col p-4 md:p-8 lg:p-12 flex-grow justify-center min-h-[calc(100vh-150px)] items-center ${
                            fadeOut ? "opacity-0" : "opacity-100"
                        } transition-opacity duration-500 ease-out`}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2
                            className="text-sm md:text-lg lg:text-2xl tracking-[0.1em] md:tracking-[0.2em] uppercase mb-2"
                            variants={item}
                        >
                            Welcome to
                        </motion.h2>
                        <motion.h1
                            className="text-[30px] sm:text-[50px] md:text-[70px] lg:text-[90px] font-black leading-tight"
                            variants={item}
                        >
                            Indian Premier League
                        </motion.h1>
                        <motion.h3
                            className="text-xs sm:text-sm md:text-xl lg:text-3xl font-medium mt-2 md:mt-4 tracking-[0.5em] sm:tracking-[1em] md:tracking-[1.5em] lg:tracking-[1.7em]"
                            variants={item}
                        >
                            Tournament
                        </motion.h3>
                    </motion.div>
                ) : (
                    <div
                        className={`w-full h-full overflow-auto transition-all duration-1000 ease-in-out ${
                            fadeIn ? "animate-fadeIn" : ""
                        }`}
                    >
                        {isLoadingHomeData ? (
                            <main className="flex flex-col items-center  justify-center min-h-[calc(100vh-280px)] text-white text-center">
                                <LoaderCircle
                                    color={"#FF6900"}
                                    className={`animate-spin w-[55px] h-[55px]`}
                                />
                                <p className="mt-7 text-3xl">Loading data...</p>
                            </main>
                        ) : (
                            <div className="h-full w-full px-3 pt-10 md:px-7 md:pt-0 py-5 pb-4">
                                <p className="text-[24px] md:text-[64px] font-bold mb-4">
                                    Indian League
                                </p>

                                <div className="grid gap-6 mt-[15px] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                                    <div className="lg:col-span-1 xl:col-span-1">
                                        <TopScorers
                                            topPlayers={
                                                homeData?.topPlayers ?? []
                                            }
                                        />
                                    </div>
                                    <div className="lg:col-span-1 xl:col-span-1">
                                        <UpcomingMatches
                                            upcomingMatches={
                                                homeData?.upcomingMatches ?? []
                                            }
                                        />
                                    </div>
                                    <div className="lg:col-span-2 xl:col-span-1">
                                        <PerformanceStats />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            ) : (
                <p className="text-sm md:text-base text-center">
                    Connect your wallet to join the tournament
                </p>
            )}
        </div>
    );
};
export default Home;
