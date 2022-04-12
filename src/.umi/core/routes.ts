// @ts-nocheck
import React from "react";
import { ApplyPluginsType } from "/Users/xwj/umiJS-mobx/node_modules/@umijs/runtime";
import * as umiExports from "./umiExports";
import { plugin } from "./plugin";

export function getRoutes() {
  const routes = [
    {
      path: "/",
      component: require("/Users/xwj/umiJS-mobx/src/.umi/plugin-layout/Layout.tsx")
        .default,
      routes: [
        {
          name: "首页",
          path: "/index",
          component: require("/Users/xwj/umiJS-mobx/src/pages/index").default,
          exact: true,
        },
        {
          name: "hooks组件",
          path: "/hooks",
          component: require("/Users/xwj/umiJS-mobx/src/pages/hooks").default,
          headerRender: false,
          exact: true,
        },
      ],
    },
  ];

  // allow user to extend routes
  plugin.applyPlugins({
    key: "patchRoutes",
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
