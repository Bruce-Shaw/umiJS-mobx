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
    ],
  },
];
