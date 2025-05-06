import { useEffect } from "react";
import { usePoolModal } from "./usePopUp";
import { getHomeData } from "../services/PlayerService";
import { HomeData } from "../types";
export const useHomeData = () => {
    const {
        homeData,
        isLoadingHomeData,
        homeDataError,
        setHomeData,
        setIsLoadingHomeData,
        setHomeDataError,
    } = usePoolModal((state) => ({
        homeData: state.homeData,
        isLoadingHomeData: state.isLoadingHomeData,
        homeDataError: state.homeDataError,
        setHomeData: state.setHomeData,
        setIsLoadingHomeData: state.setIsLoadingHomeData,
        setHomeDataError: state.setHomeDataError,
    }));

    useEffect(() => {
        if (homeData === null && !isLoadingHomeData && !homeDataError) {
            const fetchHomeData = async () => {
                setIsLoadingHomeData(true);
                setHomeDataError(null);
                try {
                    const data: HomeData = await getHomeData();
                    setHomeData(data);
                } catch (error) {
                    console.error("Error fetching home data:", error);
                    setHomeDataError(
                        "Failed to load home data. Please try again later."
                    );
                } finally {
                    setIsLoadingHomeData(false);
                }
            };

            fetchHomeData();
        }
    }, [
        homeData,
        isLoadingHomeData,
        homeDataError,
        setHomeData,
        setIsLoadingHomeData,
        setHomeDataError,
    ]);

    return {
        homeData,
        isLoadingHomeData,
        homeDataError,
    };
};
