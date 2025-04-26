"use client";

import type React from "react";
import { useEffect, useState } from "react";
import BetModal from "../../components/matchCard";
import { getMatches } from "../../../../../services/MatchService";
import { usePoolModal } from "../../../../../hooks/usePopUp";

interface Team {
    id: string;
    name: string;
    image_path: string;
}
interface Match {
    id: string;
    matchDate: string;
    pool: null | [];
    homeTeamId: string;
    homeTeam: Team;
    awayTeamId: string;
    awayTeam: Team;
}

export default function PoolsPage() {
    const [activeTab, setActiveTab] = useState<"match" | "special">("match");
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const matchData: Match[] = await getMatches();
                console.log(matchData);
                const today = new Date();
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                startOfWeek.setHours(0, 0, 0, 0);

                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                endOfWeek.setHours(23, 59, 59, 999);

                const filteredMatches = matchData.filter((match) => {
                    const matchDate = new Date(match.matchDate);
                    return matchDate >= startOfWeek && matchDate <= endOfWeek;
                });

                setMatches(filteredMatches);
                console.log(filteredMatches);
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        fetchMatches();
    }, []);

    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold mb-6">Pools</h1>

                {/* Tabs */}
                <div className="flex ml-5">
                    <button
                        className={`py-3 px-6 rounded-t-xl font-medium ${
                            activeTab === "match"
                                ? "bg-[#ff5722] text-white"
                                : "bg-[#5d3fd3] text-white"
                        }`}
                        onClick={() => setActiveTab("match")}
                    >
                        Match pools
                    </button>
                    <button
                        className={`py-3 px-6 rounded-t-lg font-medium ${
                            activeTab === "special"
                                ? "bg-[#ff5722] text-white"
                                : "bg-[#5d3fd3] text-white"
                        }`}
                        onClick={() => setActiveTab("special")}
                    >
                        Special Pools
                    </button>
                </div>

                {/* Content container with orange border */}
                <div className="border-2 border-orange-500 rounded-xl p-4">
                    {activeTab === "match" ? (
                        <MatchPoolsContent pools={matches} />
                    ) : (
                        <SpecialPoolsContent />
                    )}
                </div>
            </div>
        </div>
    );
}

interface MatchPoolsProps {
    pools: Match[];
}
function MatchPoolsContent({ pools }: MatchPoolsProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeMatch, setActiveMatch] = useState<Match | undefined>();

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {pools.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-lg w-full overflow-hidden gap-5 relative flex items-center justify-between p-2"
                        style={{
                            backgroundImage: `url('/Matchcard.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "200px",
                        }}
                    >
                        {/* Home team */}
                        <div className="text-xs m-1 text-center text-white">
                            H<br />O<br />M<br />E
                        </div>
                        <div className="flex flex-col items-center w-[80px]">
                            <div className="flex items-center justify-center">
                                <div className="w-[60px] h-[60px] min-w-[40px] min-h-[40px] relative rounded-lg overflow-hidden">
                                    <img
                                        src={item.homeTeam.image_path}
                                        alt="Team logo"
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="text-xs text-center text-white break-words w-full">
                                {item.homeTeam.name}
                            </div>
                        </div>

                        {/* Match time and bet button */}
                        <div className="flex flex-col items-center mx-1">
                            <div className="bg-[#222] text-white text-xs p-1 rounded mb-2 text-center w-full">
                                {new Date(item.matchDate)
                                    .toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })
                                    .replace(/\//g, " - ")}
                                <br />
                                {new Date(item.matchDate).toLocaleTimeString(
                                    "en-GB",
                                    { hour: "2-digit", minute: "2-digit" }
                                )}
                            </div>
                            <button
                                className="bg-[#222] cursor-pointer text-white text-xs py-2 px-2 rounded w-full "
                                onClick={() => {
                                    setActiveMatch(item);
                                    setIsModalOpen(true);
                                }}
                            >
                                Make bet
                            </button>
                        </div>

                        {/* Away team */}
                        <div className="flex flex-col items-center w-[80px]">
                            <div className="flex items-center justify-center">
                                <div className="w-[60px] h-[60px] min-w-[40px] min-h-[40px] relative rounded-lg overflow-hidden">
                                    <img
                                        src={item.awayTeam.image_path}
                                        alt="Team logo"
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="text-xs text-center text-white break-words w-full">
                                {item.awayTeam.name}
                            </div>
                        </div>
                        <div className="text-xs m-1 text-center text-white">
                            A<br />W<br />A<br />Y
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <BetModal
                    homeTeam={activeMatch?.homeTeam.name ?? ""}
                    awayTeam={activeMatch?.awayTeam.name ?? ""}
                    date={new Date(activeMatch?.matchDate ?? "")
                        .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })
                        .replace(/\//g, " - ")}
                    time={new Date(
                        activeMatch?.matchDate ?? ""
                    ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    awayLogoImg={activeMatch?.awayTeam.image_path ?? ""}
                    homeLogoImg={activeMatch?.homeTeam.image_path ?? ""}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}

function SpecialPoolsContent() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-3">
            <SpecialPoolCard
                title="Best Batsman"
                icon={
                    <img
                        src="/Cricket.svg"
                        className="w-[100px] h-[100px]  text-[#ff5722]"
                    />
                }
                description="Select the batsman whose skill, power, and consistency make them the most outstanding on the field, aiming to score the most runs of the season!"
            />

            <SpecialPoolCard
                title="Best Fielder"
                icon={
                    <img src="/Hand.svg" className="w-[100px] h-[100px] text-[#ff5722]" />
                }
                description="Choose the fielder whose sharp reflexes, safe hands, and game-changing stops make them the most outstanding on the field, striving to be the ultimate defensive asset of the season!"
            />

            <SpecialPoolCard
                title="Best Bowler"
                icon={
                    <img src="/ball.svg" className="w-[100px] h-[100px]  text-[#ff5722]" />
                }
                description="Select the bowler whose precision, speed, and strategy make them the most outstanding on the field, aiming to dominate with the most wickets of the season!"
            />
        </div>
    );
}

interface SpecialPoolCardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
}

function SpecialPoolCard({ title, icon, description }: SpecialPoolCardProps) {
    const { onOpen } = usePoolModal((state) => state);
    return (
        <div className="bg-[#0F172B] border border-[#FF6900] rounded-lg h-[480px] p-6 flex flex-col items-center text-center justify-between">
            <div className=" flex flex-col items-center">
                <div className=" mb-[30px]">{icon}</div>
                <h2 className="text-[36px] font-bold mb-4">{title}</h2>
                <p className="text-gray-300 text-[17px] mb-6">{description}</p>
            </div>
            <button
                className="bg-[#ff5722] cursor-pointer text-white py-2 px-8 rounded-md w-full"
                onClick={() => onOpen()}
            >
                Make bet
            </button>
        </div>
    );
}
