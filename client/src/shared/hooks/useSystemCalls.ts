import { v4 as uuidv4 } from "uuid";
import { useAccount } from "@starknet-react/core";
import { useDojoSDK } from "@dojoengine/sdk/react";

export const useSystemCalls = () => {
    const { useDojoStore, client } = useDojoSDK();
    const state = useDojoStore((state) => state);
    const { account } = useAccount();

    const spawnUser = async () => {
        if (!account) return;
        
        const transactionId = uuidv4();

        try {
            await client.user.spawnUser(account);
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error executing spawn user:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }

        return {
            spawnUser,
        };
    };

    const placeMatchBet = async (web2_pool_id: string, prediction_value: string, points_staked: number) => {
        if (!account) return;
        
        const transactionId = uuidv4();

        try {
            await client.bet.placeMatchBet(account, web2_pool_id, prediction_value, points_staked);
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error placing match bet:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    const placeSpecialBet = async (web2_pool_id: string, prediction_value: string, points_staked: number) => {
        if (!account) return;
        
        const transactionId = uuidv4();

        try {
            await client.bet.placeSpecialBet(account, web2_pool_id, prediction_value, points_staked);
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error placing special bet:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    const claimReward = async (web2_pool_id: string, winning_value: string, multiplier: number) => {
        if (!account) return;
        
        const transactionId = uuidv4();

        try {
            return await client.bet.claimReward(account, web2_pool_id, winning_value, multiplier);
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error claiming reward:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    // Add other system calls as needed

    return {
        spawnUser,
        placeMatchBet,
        placeSpecialBet,
        claimReward,
        // Return other system calls
    };
};
