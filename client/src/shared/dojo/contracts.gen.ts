import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish } from "starknet";

export function setupWorld(provider: DojoProvider) {

    // User System Functions
    const build_user_spawnUser_calldata = (): DojoCall => {
        return {
            contractName: "user",
            entrypoint: "spawn_user",
            calldata: [],
        };
    };

    const user_spawnUser = async (snAccount: Account | AccountInterface) => {
        try {
            return await provider.execute(
                snAccount,
                build_user_spawnUser_calldata(),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const build_user_getUserData_calldata = (): DojoCall => {
        return {
            contractName: "user",
            entrypoint: "get_user_data",
            calldata: [],
        };
    };

    const user_getUserData = async (snAccount: Account | AccountInterface) => {
        try {
            return await provider.execute(
                snAccount,
                build_user_getUserData_calldata(),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const build_user_getPointsBalance_calldata = (): DojoCall => {
        return {
            contractName: "user",
            entrypoint: "get_points_balance",
            calldata: [],
        };
    };

    const user_getPointsBalance = async (snAccount: Account | AccountInterface) => {
        try {
            return await provider.execute(
                snAccount,
                build_user_getPointsBalance_calldata(),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Bet System Functions
    const build_bet_placeMatchBet_calldata = (
        web2_pool_id: BigNumberish, 
        prediction_value: BigNumberish, 
        points_staked: BigNumberish
    ): DojoCall => {
        return {
            contractName: "bet",
            entrypoint: "place_match_bet",
            calldata: [web2_pool_id, prediction_value, points_staked],
        };
    };

    const bet_placeMatchBet = async (
        snAccount: Account | AccountInterface, 
        web2_pool_id: BigNumberish, 
        prediction_value: BigNumberish, 
        points_staked: BigNumberish
    ) => {
        try {
            return await provider.execute(
                snAccount,
                build_bet_placeMatchBet_calldata(web2_pool_id, prediction_value, points_staked),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const build_bet_placeSpecialBet_calldata = (
        web2_pool_id: BigNumberish, 
        prediction_value: BigNumberish, 
        points_staked: BigNumberish
    ): DojoCall => {
        return {
            contractName: "bet",
            entrypoint: "place_special_bet",
            calldata: [web2_pool_id, prediction_value, points_staked],
        };
    };

    const bet_placeSpecialBet = async (
        snAccount: Account | AccountInterface, 
        web2_pool_id: BigNumberish, 
        prediction_value: BigNumberish, 
        points_staked: BigNumberish
    ) => {
        try {
            return await provider.execute(
                snAccount,
                build_bet_placeSpecialBet_calldata(web2_pool_id, prediction_value, points_staked),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const build_bet_claimReward_calldata = (
        web2_pool_id: BigNumberish, 
        winning_value: BigNumberish, 
        multiplier: BigNumberish
    ): DojoCall => {
        return {
            contractName: "bet",
            entrypoint: "claim_reward",
            calldata: [web2_pool_id, winning_value, multiplier],
        };
    };

    const bet_claimReward = async (
        snAccount: Account | AccountInterface, 
        web2_pool_id: BigNumberish, 
        winning_value: BigNumberish, 
        multiplier: BigNumberish
    ) => {
        try {
            return await provider.execute(
                snAccount,
                build_bet_claimReward_calldata(web2_pool_id, winning_value, multiplier),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const build_bet_getUserBet_calldata = (web2_pool_id: BigNumberish): DojoCall => {
        return {
            contractName: "bet",
            entrypoint: "get_user_bet",
            calldata: [web2_pool_id],
        };
    };

    const bet_getUserBet = async (snAccount: Account | AccountInterface, web2_pool_id: BigNumberish) => {
        try {
            return await provider.execute(
                snAccount,
                build_bet_getUserBet_calldata(web2_pool_id),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const build_bet_hasBetOnPool_calldata = (web2_pool_id: BigNumberish): DojoCall => {
        return {
            contractName: "bet",
            entrypoint: "has_bet_on_pool",
            calldata: [web2_pool_id],
        };
    };

    const bet_hasBetOnPool = async (snAccount: Account | AccountInterface, web2_pool_id: BigNumberish) => {
        try {
            return await provider.execute(
                snAccount,
                build_bet_hasBetOnPool_calldata(web2_pool_id),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const build_bet_isBetClaimable_calldata = (
        web2_pool_id: BigNumberish, 
        winning_value: BigNumberish
    ): DojoCall => {
        return {
            contractName: "bet",
            entrypoint: "is_bet_claimable",
            calldata: [web2_pool_id, winning_value],
        };
    };

    const bet_isBetClaimable = async (
        snAccount: Account | AccountInterface, 
        web2_pool_id: BigNumberish, 
        winning_value: BigNumberish
    ) => {
        try {
            return await provider.execute(
                snAccount,
                build_bet_isBetClaimable_calldata(web2_pool_id, winning_value),
                "starkfantasy",
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Return all system functions grouped by contract
    return {
        user: {
            spawnUser: user_spawnUser,
            buildSpawnUserCalldata: build_user_spawnUser_calldata,
            getUserData: user_getUserData,
            buildGetUserDataCalldata: build_user_getUserData_calldata,
            getPointsBalance: user_getPointsBalance,
            buildGetPointsBalanceCalldata: build_user_getPointsBalance_calldata,
        },
        bet: {
            placeMatchBet: bet_placeMatchBet,
            buildPlaceMatchBetCalldata: build_bet_placeMatchBet_calldata,
            placeSpecialBet: bet_placeSpecialBet,
            buildPlaceSpecialBetCalldata: build_bet_placeSpecialBet_calldata,
            claimReward: bet_claimReward,
            buildClaimRewardCalldata: build_bet_claimReward_calldata,
            getUserBet: bet_getUserBet,
            buildGetUserBetCalldata: build_bet_getUserBet_calldata,
            hasBetOnPool: bet_hasBetOnPool,
            buildHasBetOnPoolCalldata: build_bet_hasBetOnPool_calldata,
            isBetClaimable: bet_isBetClaimable,
            buildIsBetClaimableCalldata: build_bet_isBetClaimable_calldata,
        },
    };
}
