import { useDojoSDK, useModel } from "@dojoengine/sdk/react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useAccount } from "@starknet-react/core";
import { useMemo } from "react";
import { ModelsMapping } from "../dojo/models.gen.ts";

/**
 * Custom hook to retrieve user data based on the current account.
 *
 * This hook utilizes the Dojo SDK and account information to compute an entity ID
 * and fetch the corresponding user model.
 *
 * @returns {Object} An object containing the `user` data.
 * 
 * @property {any} user - The user data fetched using the computed entity ID and the `useModel` hook.
 *
 * @remarks
 * - The `entityId` is computed using the `getEntityIdFromKeys` function with the account's address.
 * - If no account is available, the `entityId` defaults to `BigInt(0)`.
 * - The `useModel` hook is used to fetch the user data based on the computed `entityId`.
 *
 * @dependencies
 * - `useDojoSDK` from the Dojo SDK.
 * - `useAccount` for retrieving the current account information.
 * - `useModel` for fetching the user data.
 * - `getEntityIdFromKeys` for computing the entity ID.
 */
export const useUser = () => {
    const { useDojoStore } = useDojoSDK();
    const { account } = useAccount();
    
    const entityId = useMemo(() => {
        if (account) {
            return getEntityIdFromKeys([BigInt(account.address)]);
        }
        return BigInt(0);
    }, [account]);

    const user = useModel(entityId as string, ModelsMapping.User);
    
    return {
        user,
    };
};
