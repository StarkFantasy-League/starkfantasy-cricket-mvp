import { ControllerConnector } from "@cartridge/connector";
import { ColorMode, SessionPolicies } from "@cartridge/controller";
import { Connector } from "@starknet-react/core";

const colorMode: ColorMode = "dark";
const theme = "";

// Define your contract permissions
const policies: SessionPolicies = {
  contracts: {
      ['0x5b46553782ae5c36b9958cedba3fdfe63572f19183726ae8db95323a61b10cd']: {
          methods: [
              { name: "place_match_bet", entrypoint: "place_match_bet" },
              { name: "place_special_bet", entrypoint: "place_special_bet" },
              { name: "claim_reward", entrypoint: "claim_reward" },
              { name: "get_user_bet", entrypoint: "get_user_bet" },
              { name: "has_bet_on_pool", entrypoint: "has_bet_on_pool" },
              { name: "is_bet_claimable", entrypoint: "is_bet_claimable" },
          ],
      },
      ['0x23f5eafef6a4e44b4c960d2de35ff2e65929509658d1ca645ca94bbcce112fd']: {
          methods: [
              { name: "spawn_user", entrypoint: "spawn_user" },
              { name: "get_user_data", entrypoint: "get_user_data" },
              { name: "get_points_balance", entrypoint: "get_points_balance" },
          ],
      },
  },
}

// Configure connector
const cartridgeConnector = new ControllerConnector({
  policies,
  theme,
  colorMode,
  rpc: 'https://api.cartridge.gg/x/starkfantasy/katana' 
}) as never as Connector;

export default cartridgeConnector;