// @ts-nocheck
import React from "react";
import { ApplyPluginsType } from "/Users/xwj/umiJS-mobx/node_modules/@umijs/runtime";
import * as umiExports from "./umiExports";
import { plugin } from "./plugin";

export function getRoutes() {
  const routes = [
    {
      path: "/",
      component: require("@/layouts/index").default,
      routes: [
        {
          path: "/",
          redirect: "/index",
          exact: true,
        },
        {
          title: "首页",
          name: "首页",
          path: "/index",
          component: require("/Users/xwj/umiJS-mobx/src/pages/index").default,
          exact: true,
        },
        {
          title: "hooks组件",
          name: "hooks组件",
          path: "/hooks",
          component: require("/Users/xwj/umiJS-mobx/src/pages/hooks").default,
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
