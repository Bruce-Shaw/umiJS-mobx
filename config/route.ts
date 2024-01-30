// export default [
//   {
//     path: '/',
//     component: '@/layouts/index',
//     routes: [
//       {
//         path: '/',
//         redirect: '/index',
//       },
//       {
//         name: '首页',
//         path: '/index',
//         component: './index',
//       },
//       {
//         name: 'hooks组件',
//         path: '/hooks',
//         component: './hooks',
//       },
//     ],
//   },
// ];

export default [
  {
    name: "首页",
    path: "/index",
    component: "./Index",
  },
  {
    name: "hooks组件",
    path: "/hooks",
    component: "./Hooks",
    headerRender: false,
  },
  {
    name: "懒加载",
    path: "/lazyCards",
    component: "./LazyCards",
    headerRender: false,
  },
];
