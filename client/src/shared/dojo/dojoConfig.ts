import { createDojoConfig } from "@dojoengine/core";

import manifest from "../dojo/manifest_dev.json";

export const dojoConfig = createDojoConfig({
    manifest,
    masterAddress: '0x6677fe62ee39c7b07401f754138502bab7fac99d2d3c5d37df7d1c6fab10819',
    masterPrivateKey: '0x3e3979c1ed728490308054fe357a9f49cf67f80f9721f44cc57235129e090f4',
    rpcUrl: 'https://api.cartridge.gg/x/starkfantasy/katana',
    toriiUrl: 'https://api.cartridge.gg/x/starkfantasy/torii',
});
