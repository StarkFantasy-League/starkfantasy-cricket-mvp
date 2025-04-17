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
        // List all methods your frontend needs to access
        {
          name: "method1",
          entrypoint: "method1"
        },
        {
          name: "method2",
          entrypoint: "method2"
        },
        // Add all your contract methods
      ],
    },
    // Add more contracts if needed
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