"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { X, LoaderCircle, ChevronLeft, ChevronRight } from "lucide-react";
import RadarChart from "./playerchart";
import { motion, AnimatePresence } from "framer-motion";
import {
    getPlayersTableStats,
    getPlayerStat,
} from "../../../../services/PlayerService";
import axios from "axios";
import { usePoolModal } from "../../../../hooks/usePopUp";
import logo from "../../../../assets/icons/logo.png";
import { PaginatedPlayerStats, PlayerStats } from "../../../../types";

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

interface RawPlayerStatsDetail {
    image_path: string;
    team_name: string;
    player_name: string;
    stats: PlayerStatsRadar;
}

interface PlayerStatsRadar {
    runs: number;
    assists: number;
    hitting: number;
    speed: number;
    dribbling: number;
}

export default function PlayerModal() {
    const { onClose, position } = usePoolModal((state) => state);
    const [fetchedPlayers, setFetchedPlayers] = useState<ListPlayer[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [playersPerPage] = useState(10);
    const [totalPlayers, setTotalPlayers] = useState(0);
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(
        null
    );
    const [selectedPlayerStats, setSelectedPlayerStats] =
        useState<RawPlayerStatsDetail | null>(null);
    const [pointsToBet, setPointsToBet] = useState("");
    const [isLoadingList, setIsLoadingList] = useState(true);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [listError, setListError] = useState<string | null>(null);
    const [statsError, setStatsError] = useState<string | null>(null);

    const initialLoadComplete = useRef(false);
    
    useEffect(() => {
        let isMounted = true;
        const fetchPlayersList = async () => {
            if (!initialLoadComplete.current) {
                setIsLoadingList(true);
            } else {
                setIsLoadingTable(true);
            }

            setListError(null);

            try {
                const response: PaginatedPlayerStats =
                    await getPlayersTableStats(
                        position,
                        currentPage,
                        playersPerPage
                    );

                if (isMounted) {
                    const mappedData: ListPlayer[] = response.data.map(
                        (raw: PlayerStats) => ({
                            id: raw.id,
                            name: raw.player_name,
                            team: raw.player_team,
                            imagePath: raw.image_path || logo,
                            selectedPercentage: raw.selected_percentage,
                            rewardRate: raw.reward_rate,
                            points: raw.points,
                            selectedPercentageFormatted: `${raw.selected_percentage}%`,
                            rewardRateFormatted: `${raw.reward_rate}%`,
                        })
                    );
                    setFetchedPlayers(mappedData);
                    setTotalPlayers(response.total);

                    if (mappedData.length > 0) {
                        setSelectedPlayerId(mappedData[0].id);
                    } else {
                        setSelectedPlayerId(null);
                        setSelectedPlayerStats(null);
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
                    setFetchedPlayers([]);
                    setTotalPlayers(0);
                    setSelectedPlayerId(null);
                    setSelectedPlayerStats(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoadingList(false);
                    setIsLoadingTable(false);
                    if (!initialLoadComplete.current) {
                        initialLoadComplete.current = true;
                    }
                }
            }
        };

        fetchPlayersList();

        return () => {
            isMounted = false;
        };
    }, [position, currentPage, playersPerPage]);

    useEffect(() => {
        let isMounted = true;
        if (selectedPlayerId !== null) {
            const fetchPlayerStats = async (playerId: string) => {
                setStatsError(null);
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
                }
            };
            fetchPlayerStats(selectedPlayerId);
        } else {
            setSelectedPlayerStats(null);
            setStatsError(null);
        }
        return () => {
            isMounted = false;
        };
    }, [selectedPlayerId]);

    const selectedPlayerListItem = useMemo(() => {
        return (
            fetchedPlayers.find((player) => player.id === selectedPlayerId) ||
            null
        );
    }, [fetchedPlayers, selectedPlayerId]);

    const totalPages = Math.ceil(totalPlayers / playersPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

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
                    className="absolute inset-0 flex items-center justify-center z-50 bg-black/70 text-white scrollCustom"
                >
                    <LoaderCircle
                        color={"#FF6900"}
                        className={`animate-spin w-[45px] h-[45px]`}
                    />
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
                    className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/70 text-red-500 scrollCustom"
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
                    className="absolute inset-0 flex flex-col items-center justify-center z-50 text-white bg-black/70 scrollCustom"
                >
                    No player data available for this selection.
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
                className=" fixed inset-0 flex items-center justify-center z-[9000] scrollCustom"
            >
                <motion.div
                    className="absolute inset-0 bg-black/50 scrollCustom"
                    onClick={onClose}
                ></motion.div>

                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-[90vw] xl:w-[90vw] 2xl:w-[70vw] max-h-[90vh] bg-[#1E2939] text-white rounded-xl overflow-scroll scrollCustom shadow-xl"
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
                                <div className="flex-1 flex items-center justify-center  shadow-2xl bg-[#0F172B] rounded-xl text-red-500 text-center p-4 m-6">
                                    {statsError}
                                </div>
                            ) : selectedPlayerId === null ? (
                                <div className="flex-1 flex items-center justify-center m-8 shadow-2xl bg-[#0F172B] rounded-xl text-gray-400 min-h-[300px]">
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
                                                            selectedPlayerStats?.image_path ??
                                                            logo
                                                        }
                                                        alt={
                                                            selectedPlayerStats?.team_name ||
                                                            "Team Logo"
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
                                                className="text-[24px] font-medium text-white border-b-[2px] mb-[5px] border-orange-500 w-full text-center"
                                            >
                                                {selectedPlayerStats?.player_name ||
                                                    selectedPlayerListItem.name}
                                            </motion.p>
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.15 }}
                                                className="text-center text-gray-400 font-base text-sm mb-2"
                                            >
                                                {selectedPlayerStats?.team_name ||
                                                    selectedPlayerListItem.team}
                                            </motion.div>
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-center text-indigo-400 font-base text-xl mb-4"
                                            >
                                                STATS
                                            </motion.div>
                                            <motion.div className=" h-[190px] w-[300px]">
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
                            className="w-full bg-[#101828] p-3 sm:p-4 shadow-2xl rounded-3xl my-4 sm:my-8 lg:mr-4 scrollCustom flex flex-col relative"
                        >
                            {isLoadingTable && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#101828]/70 z-10 rounded-3xl">
                                    <LoaderCircle
                                        color={"#FF6900"}
                                        className={`animate-spin w-[45px] h-[45px]`}
                                    />
                                </div>
                            )}

                            <div
                                className={`overflow-x-auto flex-grow ${
                                    isLoadingTable ? "blur-sm" : ""
                                }`}
                            >
                                <div className="min-w-[400px] grid grid-cols-[2fr_1fr_1fr_1fr] gap-1 sm:gap-2 bg-indigo-800 p-2 rounded-md mb-2 text-xs sm:text-sm items-center">
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
                                <div className="min-w-[400px] max-h-[300px] sm:max-h-[350px] lg:max-h-[450px] overflow-y-auto scrollCustom">
                                    {fetchedPlayers.map((player, index) => (
                                        <motion.div
                                            key={player.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.05 * index }}
                                            onClick={() =>
                                                setSelectedPlayerId(player.id)
                                            }
                                            className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-1 sm:gap-2 p-2 rounded-md mb-1 cursor-pointer items-center text-xs sm:text-sm ${
                                                player.id === selectedPlayerId
                                                    ? "bg-indigo-800"
                                                    : "hover:bg-[#2a3547]"
                                            }`}
                                        >
                                            <div className="flex items-center col-span-1 w-full gap-2">
                                                <div className="w-[24px] h-[24px] overflow-hidden bg-white rounded-full flex items-center justify-center">
                                                    <img
                                                        src={
                                                            player?.imagePath ??
                                                            logo
                                                        }
                                                        alt="img"
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>

                                                <div>
                                                    <div className="w-full text-xs">
                                                        {player?.name}
                                                    </div>

                                                    <div className="text-xs text-orange-500">
                                                        {player?.team}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center col-span-1">
                                                {
                                                    player?.selectedPercentageFormatted
                                                }
                                            </div>
                                            <div className="text-center col-span-1">
                                                {player?.rewardRateFormatted}
                                            </div>
                                            <div className="text-center col-span-1">
                                                {player?.points}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-4 gap-4">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={
                                            currentPage === 1 || isLoadingTable
                                        }
                                        className="px-3 py-1 bg-[#F54900] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <span className="text-sm">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={
                                            currentPage === totalPages ||
                                            isLoadingTable
                                        }
                                        className="px-3 py-1 bg-[#F54900] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
