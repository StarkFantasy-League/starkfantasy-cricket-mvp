import { KeysClause, ToriiQueryBuilder } from "@dojoengine/sdk";
import { useDojoSDK, useModel } from "@dojoengine/sdk/react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useAccount } from "@starknet-react/core";
import { useEffect, useMemo } from "react";
import { AccountInterface, addAddressPadding } from "starknet";
import { ModelsMapping } from "../dojo/models.gen";

/**
 * Custom hook to retrieve and subscribe to user data in real-time.
 *
 * This hook utilizes the Dojo SDK and Starknet account to compute an entity ID,
 * fetch the corresponding User model, and stay synced via subscriptions.
 */
export const useUser = () => {
  const { useDojoStore, sdk } = useDojoSDK();
  const { account } = useAccount();
  const state = useDojoStore((state) => state);

  // Calculate entity ID from account address
  const entityId = useMemo(() => {
    if (account) {
      return getEntityIdFromKeys([BigInt(account.address)]);
    }
    return BigInt(0);
  }, [account]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const subscribe = async (account: AccountInterface) => {
      const [initialData, subscription] = await sdk.subscribeEntityQuery({
        query: new ToriiQueryBuilder()
          .withClause(
            KeysClause(
              [ModelsMapping.User],
              [addAddressPadding(account.address)],
              "VariableLen"
            ).build()
          )
          .includeHashedKeys(),
        callback: ({ error, data }) => {
          if (error) {
            console.error("Error setting up User entity subscription:", error);
          } else if (data && data[0].entityId !== "0x0") {
            state.updateEntity(data[0]);
          }
        },
      });

      state.setEntities(initialData);
      unsubscribe = () => subscription.cancel();
    };

    if (account) {
      subscribe(account);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [sdk, account]);

  const user = useModel(entityId as string, ModelsMapping.User);

  return {
    user,
  };
};
