import { defineConfig } from "umi";
import routes from "./route";

export default defineConfig({
  hash: true,
  history: {
    type: "hash",
  },
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: "Ant Design",
    locale: true,
    layout: "side",
  },
  routes,
  devServer: {
    port: 3000,
  },
});
