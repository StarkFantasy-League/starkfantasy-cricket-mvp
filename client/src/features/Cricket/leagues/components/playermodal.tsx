"use client";

import { useState } from "react";
import { X } from "lucide-react";
import RadarChart from "./playerchart";

interface PlayerModalProps {
    onClose: () => void;
}

interface Player {
    id: number;
    name: string;
    team: string;
    rewardRate: string;
    winRate: string;
    points: number;
    stats: {
        goals: number;
        assists: number;
        speed: number;
        dribbling: number;
        hitting: number;
    };
}

export default function PlayerModal({ onClose }: PlayerModalProps) {
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(5);
    const [pointsToBet, setPointsToBet] = useState("");

    const players: Player[] = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: "Player name",
        team: "TEAM",
        rewardRate: "13.5%",
        winRate: "72.3%",
        points: 310,
        stats: {
            goals: Math.random() * 0.5 + 0.3,
            assists: Math.random() * 0.5 + 0.3,
            speed: Math.random() * 0.5 + 0.3,
            dribbling: Math.random() * 0.5 + 0.3,
            hitting: Math.random() * 0.5 + 0.3,
        },
    }));

    const selectedPlayer =
        players.find((player) => player.id === selectedPlayerId) || players[0];

    return (
        <div className="absolute inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black bg-opacity-75"
                onClick={onClose}
            ></div>

            <div className="relative w-full  max-w-6xl max-h-full bg-[#1E2939] text-white rounded-xl overflow-scroll md:overflow-hidden  shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute mb-12 top-4 right-4 text-gray-300 hover:text-white"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Left side - Player details */}
                    <div>
                        <div className="flex shadow-2xl bg-[#0F172B] rounded-xl m-8">
                            <div className="flex items-center justify-center m-4 ">
                                <div className="w-40 h-40 bg-gray-300 flex flex-col mx-auto rounded-md overflow-hidden">
                                    <img
                                        src="/placeholder.svg?height=128&width=128"
                                        alt="Player"
                                        width={328}
                                        height={328}
                                        className="object-cover rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-2 flex flex-col">
                                <h2 className="text-3xl font-bold text-center mb-1">
                                    {selectedPlayer
                                        ? selectedPlayer.name
                                        : "Player name"}
                                </h2>
                                <div className="border-b-2 border-[#F54900] w-full mb-2"></div>

                                <div className="text-center text-indigo-400 font-bold text-xl mb-4">
                                    STATS
                                </div>

                                <div className="flex-1 flex items-center justify-center">
                                    <RadarChart stats={selectedPlayer.stats} />
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto flex flex-col items-center justify-center">
                            <div className="w-80 mx-auto">
                                <div className="flex justify-between mb-2">
                                    <span className="text-lg">
                                        Points to bet:
                                    </span>
                                    <span className="text-gray-300">
                                        12100 available
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={pointsToBet}
                                        onChange={(e) =>
                                            setPointsToBet(e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-full bg-transparent border-2 border-[#F54900] text-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            <button className=" w-[20rem] md:w-[26rem] mb-7 bg-[#F54900] text-white font-bold py-3 rounded-2xl transition-colors">
                                Select Player
                            </button>
                        </div>
                    </div>

                    {/* Right side - Player list */}
                    <div className="w-full md:w-1/2 bg-[#101828] p-4 shadow-2xl rounded-3xl my-8 md:mx-4">
                        <div className="grid grid-cols-4 gap-2 bg-indigo-800 p-2 rounded-md mb-2 text-sm items-center">
                            <div>Player</div>
                            <div className="text-center">Selected</div>
                            <div className="text-center">Reward rate</div>
                            <div className="text-center">Points</div>
                        </div>

                        <div className="max-h-[450px] overflow-y-auto">
                            {players.map((player) => (
                                <div
                                    key={player.id}
                                    onClick={() =>
                                        setSelectedPlayerId(player.id)
                                    }
                                    className={`flex  md:gap-9 p-2 rounded-md mb-1 cursor-pointer ${
                                        player.id === selectedPlayerId
                                            ? "bg-indigo-800"
                                            : "hover:bg-[#2a3547]"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                            {player.id === selectedPlayerId && (
                                                <div className="w-4 h-4 bg-indigo-800 rounded-full"></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="w-full">
                                                {player.name}
                                            </div>
                                            <div className="text-xs text-orange-500">
                                                {player.team}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center self-center ml-4">
                                        {player.rewardRate}
                                    </div>
                                    <div className="text-center self-center ml-14">
                                        {player.winRate}
                                    </div>
                                    <div className="text-center self-center ml-12">
                                        {player.points}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
