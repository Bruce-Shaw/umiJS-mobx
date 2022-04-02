import { defineConfig } from "umi";
import routes from "./routes";

export default defineConfig({
  hash: true,
  history: {
    type: "hash",
  },
  routes,
  devServer: {
    port: 3000,
  },
});
