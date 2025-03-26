"use client";
import React from "react";
import MatchPanel from "./components/MatchPanel";
import UserPanel from "./components/UserPanel";
import LeaguesPanel from "./components/LeaguesPanel";
import LeagueCards from "./components/LeagueCards";
// import NavBar from "@/components/navBar";
// import Image from "next/image";
import EmptyPanel from "./components/EmptyPanel";
import LeaguePanelCard from "./components/LeaguePanelCard";
import Header from "@/components/header/page";

function page() {
    const handleViewDetails = () => {
        console.log("View Details clicked");
    };
    return (
        <div className="bg-[#020618] h-full pt-[150px]">
            <Header title={true}/>

            <div className="flex gap-8 w-[70%] mx-auto">
                <div className="flex flex-col gap-y-2">
                    <UserPanel />
                    <LeaguePanelCard />
                </div>
                <div className="flex flex-col gap-y-2 w-[80%]">
                    <MatchPanel
                        team1Image="/assets/images/team-1.png"
                        team2Image="/assets/images/team-2.png"
                        date={new Date(2025, 1, 19)}
                        time="20:00"
                        onViewDetails={handleViewDetails}
                    />

                    <LeaguesPanel />
                </div>
                <div>
                    <EmptyPanel />
                </div>
            </div>
        </div>
    );
}

export default page;
