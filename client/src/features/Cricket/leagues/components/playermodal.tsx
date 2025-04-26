"use client";

import { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import RadarChart from "./playerchart";
import { motion, AnimatePresence } from "framer-motion";
import {
    getPlayersTableStats,
    getPlayerStat,
} from "../../../../services/PlayerService";
import axios from "axios";
import { usePoolModal } from "../../../../hooks/usePopUp";

interface RawPlayerStatsListItem {
    id: string;
    player_name: string;
    player_team: string;
    image_path: string;
    selected_percentage: number;
    reward_rate: number;
    points: number;
}

interface RawPlayerStatsDetail {
    image_path: string;
    player_name: string;
    stats: PlayerStats;
}

interface ListPlayer {
    id: string;
    name: string;
    team: string;
    imagePath: string;
    selectedPercentage: number;
    rewardRate: number;
    points: number;
    selectedPercentageFormatted: string;
    rewardRateFormatted: string;
}

interface PlayerStats {
    goals: number;
    assists: number;
    hitting: number;
    speed: number;
    dribbling: number;
}

export default function PlayerModal() {
    const { onClose } = usePoolModal((state) => state);
    const [fetchedPlayers, setFetchedPlayers] = useState<ListPlayer[]>([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(
        null
    );
    const [selectedPlayerStats, setSelectedPlayerStats] =
        useState<RawPlayerStatsDetail | null>(null);
    const [pointsToBet, setPointsToBet] = useState("");
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [listError, setListError] = useState<string | null>(null);
    const [statsError, setStatsError] = useState<string | null>(null);

    console.log(selectedPlayerStats, "pw");

    useEffect(() => {
        let isMounted = true;
        const fetchPlayersList = async () => {
            setIsLoadingList(true);
            setListError(null);
            try {
                const rawData: RawPlayerStatsListItem[] =
                    await getPlayersTableStats();
                if (isMounted) {
                    const mappedData: ListPlayer[] = rawData.map((raw) => ({
                        id: raw.id,
                        name: raw.player_name,
                        team: raw.player_team,
                        imagePath: raw.image_path || "/placeholder.svg",
                        selectedPercentage: raw.selected_percentage,
                        rewardRate: raw.reward_rate,
                        points: raw.points,
                        selectedPercentageFormatted: `${raw.selected_percentage}%`,
                        rewardRateFormatted: `${raw.reward_rate}%`,
                    }));
                    setFetchedPlayers(mappedData);
                    if (mappedData.length > 0) {
                        setSelectedPlayerId(mappedData[0].id);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Error fetching player list:", err);
                    if (axios.isAxiosError(err)) {
                        setListError(
                            `Failed to load players: ${err.message} (Status: ${err.response?.status})`
                        );
                    } else {
                        setListError(
                            `Failed to load players: ${
                                err instanceof Error
                                    ? err.message
                                    : "An unknown error occurred"
                            }`
                        );
                    }
                }
            } finally {
                if (isMounted) {
                    setIsLoadingList(false);
                }
            }
        };
        fetchPlayersList();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (selectedPlayerId !== null && fetchedPlayers.length > 0) {
            const fetchPlayerStats = async (playerId: string) => {
                setStatsError(null);
                setSelectedPlayerStats(null);
                try {
                    const rawStatsData: RawPlayerStatsDetail =
                        await getPlayerStat(playerId);
                    if (isMounted) {
                        setSelectedPlayerStats(rawStatsData);
                    }
                } catch (err) {
                    if (isMounted) {
                        console.error(
                            `Error fetching stats for player ${playerId}:`,
                            err
                        );
                        if (axios.isAxiosError(err)) {
                            setStatsError(
                                `Failed to load stats: ${err.message} (Status: ${err.response?.status})`
                            );
                        } else {
                            setStatsError(
                                `Failed to load stats: ${
                                    err instanceof Error
                                        ? err.message
                                        : "An unknown error occurred"
                                }`
                            );
                        }
                        setSelectedPlayerStats(null);
                    }
                } finally {
                    if (isMounted) {
                        //
                    }
                }
            };
            fetchPlayerStats(selectedPlayerId);
        } else if (
            selectedPlayerId === null &&
            !isLoadingList &&
            fetchedPlayers.length === 0
        ) {
            setSelectedPlayerStats(null);
            setStatsError(null);
        }
        return () => {
            isMounted = false;
        };
    }, [selectedPlayerId, fetchedPlayers.length, isLoadingList]);

    const selectedPlayerListItem = useMemo(() => {
        return (
            fetchedPlayers.find((player) => player.id === selectedPlayerId) ||
            null
        );
    }, [fetchedPlayers, selectedPlayerId]);

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50, rotate: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.4,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.7,
            y: 100,
            rotate: 10,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
    };

    if (isLoadingList) {
        return (
            <AnimatePresence>
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 flex items-center justify-center z-50 bg-black text-white"
                >
                    Loading players...
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-300 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </motion.div>
            </AnimatePresence>
        );
    }

    if (listError) {
        return (
            <AnimatePresence>
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black text-red-500"
                >
                    {listError}
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-[#F54900] text-white rounded-md"
                    >
                        Close
                    </button>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-300 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </motion.div>
            </AnimatePresence>
        );
    }

    if (fetchedPlayers.length === 0 && !isLoadingList && !listError) {
        return (
            <AnimatePresence>
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 flex flex-col items-center justify-center z-50 text-white"
                >
                    No player data available.
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-[#F54900] text-white rounded-md"
                    >
                        Close
                    </button>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-300 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className=" fixed inset-0 flex items-center justify-center z-[9000]"
            >
                <motion.div
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                ></motion.div>

                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-[90vw] xl:w-[90vw] 2xl:w-[70vw] max-h-[90vh] bg-[#1E2939] text-white rounded-xl overflow-scroll shadow-xl"
                >
                    <button
                        onClick={onClose}
                        className=" w-full flex justify-end pt-[24px] pr-[24px] text-gray-300 hover:text-white"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex flex-col xl:flex-row gap-5">
                        <div className=" flex flex-col justify-between w-[100%] 2xl:w-[50%]">
                            {statsError ? (
                                <div className="flex-1 flex items-center justify-center  shadow-2xl bg-[#0F172B] rounded-xl text-red-500 text-center p-4">
                                    {statsError}
                                </div>
                            ) : selectedPlayerId === null ? (
                                <div className="flex-1 flex items-center justify-center m-8 shadow-2xl bg-[#0F172B] rounded-xl text-gray-400">
                                    Select a player to see details and stats
                                </div>
                            ) : selectedPlayerListItem ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col justify-center md:flex-row shadow-2xl bg-[#0F172B] border border-gray-800  rounded-xl  m-6  px-[24px]"
                                >
                                    <div className="flex flex-col md:flex-row  items-center justify-between">
                                        <div className="flex flex-col items-center justify-center ">
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white flex flex-col mx-auto rounded-md overflow-hidden w-[160px] h-[160px] mt-[16px]"
                                            >
                                                {selectedPlayerStats?.image_path && (
                                                    <img
                                                        src={
                                                            selectedPlayerStats?.image_path
                                                        }
                                                        alt={
                                                            selectedPlayerListItem.name
                                                        }
                                                        width={160}
                                                        height={160}
                                                        className="object-cover rounded-md object-top w-[160px] h-[160px]"
                                                    />
                                                )}
                                            </motion.div>
                                        </div>
                                        <div className=" p-4 flex flex-col items-center justify-center w-[300px] ">
                                            <motion.p
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                className="text-[30px] font-medium text-white border-b-[2px] mb-[5px] border-orange-500 w-full text-center"
                                            >
                                                {selectedPlayerListItem.name}
                                            </motion.p>
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-center text-indigo-400 font-base text-xl mb-4"
                                            >
                                                STATS
                                            </motion.div>
                                            <motion.div className=" h-[160px]">
                                                {selectedPlayerStats?.stats && (
                                                    <RadarChart
                                                        stats={
                                                            selectedPlayerStats.stats
                                                        }
                                                    />
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center min-h-[300px] m-8 shadow-2xl bg-[#0F172B] rounded-xl text-yellow-500">
                                    Could not find player details.
                                </div>
                            )}

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mx-auto flex flex-col items-center justify-center "
                            >
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
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-[20rem]  mb-7 bg-[#F54900] text-white font-bold py-3 rounded-2xl transition-colors"
                                >
                                    Select Player
                                </motion.button>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full lg:w-1/2 bg-[#101828] p-3 sm:p-4 shadow-2xl rounded-3xl my-4 sm:my-8 lg:mr-4"
                        >
                            <div className="overflow-x-auto">
                                <div className="min-w-[400px] grid grid-cols-4 gap-1 sm:gap-2 bg-indigo-800 p-2 rounded-md mb-2 text-xs sm:text-sm items-center">
                                    <div className="col-span-1 px-2">
                                        Player
                                    </div>
                                    <div className="text-center col-span-1">
                                        Selected %
                                    </div>
                                    <div className="text-center col-span-1">
                                        Reward rate
                                    </div>
                                    <div className="text-center col-span-1">
                                        Points
                                    </div>
                                </div>
                                <div className="min-w-[400px] max-h-[300px] sm:max-h-[350px] lg:max-h-[450px] overflow-y-auto">
                                    {fetchedPlayers.map((player, index) => (
                                        <motion.div
                                            key={player.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            onClick={() =>
                                                setSelectedPlayerId(player.id)
                                            }
                                            className={`grid grid-cols-4 gap-1 sm:gap-2 p-2 rounded-md mb-1 cursor-pointer items-center text-xs sm:text-sm ${
                                                player.id === selectedPlayerId
                                                    ? "bg-indigo-800"
                                                    : "hover:bg-[#2a3547]"
                                            }`}
                                        >
                                            <div className="flex items-center col-span-1 w-[130px] gap-2">
                                                <div className="w-[24px] h-[24px] overflow-hidden bg-white rounded-full flex items-center justify-center">
                                                    <img
                                                        src={player.imagePath}
                                                        alt="img"
                                                    />
                                                </div>

                                                <div>
                                                    <div className="w-full text-xs">
                                                        {player.name}
                                                    </div>

                                                    <div className="text-xs text-orange-500">
                                                        {player.team}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center col-span-1">
                                                {
                                                    player.selectedPercentageFormatted
                                                }
                                            </div>
                                            <div className="text-center col-span-1">
                                                {player.rewardRateFormatted}
                                            </div>
                                            <div className="text-center col-span-1">
                                                {player.points}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
