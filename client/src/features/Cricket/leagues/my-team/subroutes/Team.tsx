"use client";

import Table from "../../components/table";
import CricketGround from "../../components/cricketGround";
import { useEffect } from "react";
import { getPlayerTableStats } from "./../../../../../services/PlayerService";
import { LoaderCircle } from "lucide-react";
import { usePoolModal } from "../../../../../hooks/usePopUp";

const Team = () => {
    const {
        playersData,
        isLoadingPlayers,
        playersError,
        setPlayersData,
        setIsLoadingPlayers,
        setPlayersError,
    } = usePoolModal((state) => ({
        playersData: state.playersData,
        isLoadingPlayers: state.isLoadingPlayers,
        playersError: state.playersError,
        setPlayersData: state.setPlayersData,
        setIsLoadingPlayers: state.setIsLoadingPlayers,
        setPlayersError: state.setPlayersError,
    }));

    useEffect(() => {
        if (playersData.length === 0 && !isLoadingPlayers && !playersError) {
            const fetchPlayers = async () => {
                setIsLoadingPlayers(true);
                setPlayersError(null);
                try {
                    const response = await getPlayerTableStats();
                    setPlayersData(response);
                } catch (error) {
                    console.error("Error fetching players:", error);
                    setPlayersError("Failed to load player data. Please try again later.");
                } finally {
                    setIsLoadingPlayers(false);
                }
            };

            fetchPlayers();
        }
    }, [playersData.length, isLoadingPlayers, playersError, setPlayersData, setIsLoadingPlayers, setPlayersError]);

    if (isLoadingPlayers) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen text-white">
                <LoaderCircle
                    color={"#FF6900"}
                    className={`animate-spin w-[55px] h-[55px]`}
                />
                <p className="mt-4 text-[20px]">Loading players...</p>
            </main>
        );
    }

    // if (playersError) {
    //     return (
    //         <main className="flex flex-col items-center justify-center min-h-screen text-red-500">
    //             <p>{playersError}</p>
    //         </main>
    //     );
    // }

    // if (playersData.length === 0 && !isLoadingPlayers && !playersError) {
    //     return (
    //         <main className="flex flex-col items-center justify-center min-h-screen text-gray-400">
    //             <p>No players found.</p>
    //         </main>
    //     );
    // }

    return (
        <main className="flex flex-col px-[5px] md:px[30px] overflow-hidden scrollCustom">
            <div className="flex justify-center">
                <CricketGround teamPlayers={playersData} />
            </div>

            <div className="">
                <Table players={playersData} />
            </div>
        </main>
    );
};

export default Team;
