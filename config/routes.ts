export default [
  {
    path: "/",
    component: "@/layouts/index",
    routes: [
      {
        path: "/",
        redirect: "/index",
      },
      {
        title: "首页",
        name: "首页",
        path: "/index",
        component: "./index",
      },
      {
        title: "hooks组件",
        name: "hooks组件",
        path: "/hooks",
        component: "./hooks",
      },
    ],
  },
];
