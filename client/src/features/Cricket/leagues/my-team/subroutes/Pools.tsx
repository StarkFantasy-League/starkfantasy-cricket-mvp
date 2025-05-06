"use client";
import { useEffect, useState } from "react";
import BetModal from "../../components/matchCard";
import { getMatches } from "../../../../../services/MatchService";
import { SpecialPoolsContent } from "./components/SpecialPoolsContent";

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
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        fetchMatches();
    }, []);

    return (
        <div className={`scrollCustom min-h-screen text-white`}>
            <div className="px-7 py-5">
                <h1 className="text-5xl font-bold mb-6">Pools</h1>

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
            <div className="scrollCustom grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {pools.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-lg w-full overflow-hidden gap-3 relative flex items-center justify-between py-2 px-4"
                        style={{
                            backgroundImage: `url('/Matchcard.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "150px",
                        }}
                    >
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
                            {new Date(item.matchDate) > new Date() ? (
                                <button
                                    className="bg-[#222] cursor-pointer text-white text-xs py-2 px-2 rounded w-full "
                                    onClick={() => {
                                        setActiveMatch(item);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    Make bet
                                </button>
                            ) : (
                                <div className="text-amber-500 text-center text-xs py-2 px-2 rounded w-full bg-[#222]">
                                    Pool closed
                                </div>
                            )}
                        </div>

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

            {isModalOpen && activeMatch && (
                <BetModal
                    homeTeam={activeMatch.homeTeam.name}
                    awayTeam={activeMatch.awayTeam.name}
                    date={new Date(activeMatch.matchDate)
                        .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })
                        .replace(/\//g, " - ")}
                    time={new Date(activeMatch.matchDate).toLocaleTimeString(
                        "en-GB",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    )}
                    awayLogoImg={activeMatch.awayTeam.image_path}
                    homeLogoImg={activeMatch.homeTeam.image_path}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
