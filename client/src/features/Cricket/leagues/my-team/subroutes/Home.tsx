"use client";

import UpcomingMatches from "../../components/upcomingMatches";
import PerformanceStats from "../../components/performanceStats";
import TopScorers from "../../components/topScorers";
import { useHomeData } from "../../../../../hooks/useHomeData";
import { LoaderCircle } from "lucide-react";

const Home = () => {
    const { homeData, isLoadingHomeData, homeDataError } = useHomeData();

    if (isLoadingHomeData) {
        return (
            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-white text-center">
                <LoaderCircle
                    color={"#FF6900"}
                    className={`animate-spin w-[55px] h-[55px]`}
                />
                <p className="mt-4 text-[38px] font-extralight animate-pulse">
                    Welcome to
                </p>
                <p className="text-5xl md:text-[128px] font-bold mt-2 animate-pulse">
                    Indian Premier League
                </p>
                <p className="text-lg md:text-[40px]  font-extralight tracking-[20px] mt-5 animate-pulse">
                    TOURNAMENT
                </p>
            </main>
        );
    }

    if (homeDataError) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen text-red-50 text-base">
                <p>{homeDataError}</p>
            </main>
        );
    }

    if (!homeData || !homeData.topPlayers || !homeData.upcomingMatches) {
         return (
            <main className="flex flex-col items-center justify-center min-h-screen text-gray-400">
                <p>...</p>
            </main>
        );
    }

    return (
        <div className=" px-3 md:px-7 py-3 md:py-7 pt-10 md:pt-0">
            <p className="text-[24px] md:text-[64px] font-bold">Indian League</p>

            <div className="grid gap-6 mt-[15px] grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
                <div className="col-span-1">
                    <TopScorers topPlayers={homeData?.topPlayers ?? []} />
                </div>
                <div className="col-span-1">
                    <UpcomingMatches
                        upcomingMatches={homeData?.upcomingMatches ?? []}
                    />
                </div>
                <div className="col-span-1">
                    <PerformanceStats />
                </div>
            </div>
        </div>
    );
};

export default Home;
