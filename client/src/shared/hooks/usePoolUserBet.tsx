import { useDojoSDK, useModel } from "@dojoengine/sdk/react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useAccount } from "@starknet-react/core";
import { useMemo } from "react";
import { ModelsMapping } from "../dojo/models.gen.ts";

/**
 * Custom hook to retrieve the user's bet for a specific pool.
 *
 * @param web2_pool_id - The ID of the pool in the Web2 system.
 * @returns An object containing the `poolUserBet` data.
 *
 * @remarks
 * - This hook uses the `useAccount` hook to access the user's account information.
 * - It computes a unique `entityId` based on the user's account address and the pool ID.
 * - The `entityId` is then used to fetch the `poolUserBet` data from the model.
 *
 * @example
 * ```tsx
 * const { poolUserBet } = usePoolUserBet("12345");
 * console.log(poolUserBet);
 * ```
 */
export const usePoolUserBet = (web2_pool_id: string) => {
    const { account } = useAccount();
    
    const entityId = useMemo(() => {
        if (account && web2_pool_id) {
            return getEntityIdFromKeys([BigInt(account.address), BigInt(web2_pool_id)]);
        }
        return BigInt(0);
    }, [account, web2_pool_id]);

    const poolUserBet = useModel(entityId as string, ModelsMapping.PoolUserBet);
    
    return {
        poolUserBet,
    };
};
