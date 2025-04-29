import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Dojo related imports
import { init } from "@dojoengine/sdk";
import { DojoSdkProvider } from "@dojoengine/sdk/react";
import type { SchemaType } from "./shared/dojo/models.gen.ts"; // This is an example, replace with your actual model type
import { setupWorld } from "./shared/dojo/contracts.gen.ts"; // This is an example, replace with your actual contract functions
import { dojoConfig } from "./shared/dojo/dojoConfig.ts";
import StarknetProvider from "./shared/dojo/starknet-provider.tsx";
import "./index.css";

import App from "./App.tsx";

/**
 * Initializes and bootstraps the Dojo application.
 * Sets up the SDK, burner manager, and renders the root component.
 *
 * @throws {Error} If initialization fails
 */
async function main() {
    const sdk = await init<SchemaType>({
        client: {
            // Add toriiUrl and relayUrl for proper network connectivity
            toriiUrl: dojoConfig.toriiUrl,
            relayUrl: dojoConfig.relayUrl,
            worldAddress: dojoConfig.manifest.world.address,
        },
        domain: {
            name: "WORLD_NAME",
            version: "1.0",
            chainId: "KATANA",
            revision: "1",
        },
    });

    const rootElement = document.getElementById("root");
    if (!rootElement) throw new Error("Root element not found");

    createRoot(rootElement).render(
        <StrictMode>
            <DojoSdkProvider
                sdk={sdk}
                dojoConfig={dojoConfig}
                clientFn={setupWorld}
            >
                <StarknetProvider>
                    <App />
                </StarknetProvider>
            </DojoSdkProvider>
        </StrictMode>
    );
}

main().catch((error) => {
    console.error("Failed to initialize the application:", error);
});
