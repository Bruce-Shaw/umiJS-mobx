// @ts-nocheck
import { Plugin } from "/Users/xwj/umiJS-mobx/node_modules/@umijs/runtime";

const plugin = new Plugin({
  validKeys: [
    "modifyClientRenderOpts",
    "patchRoutes",
    "rootContainer",
    "render",
    "onRouteChange",
    "__mfsu",
    "getInitialState",
    "initialStateConfig",
    "layout",
    "layoutActionRef",
    "request",
  ],
});

export { plugin };
