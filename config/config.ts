// https://umijs.org/config/
import { defineConfig } from "@umijs/max";
import { join } from "path";
import colors from "./colors";
import defaultSettings from "./defaultSettings";
import proxy from "./proxy";
import routes from "./routes";
import themeProvider from "./themeProvider";

const { REACT_APP_ENV = "dev" } = process.env;

export default defineConfig({
  hash: true,
  routes,
  theme: {
    ...colors,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  model: {},
  initialState: {},
  title: "Dental clinic",
  layout: {
    locale: true,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: "antd",
    plugins: ["duration"],
  },
  locale: {
    default: "en-US",
    antd: true,
    baseNavigator: true,
  },

  antd: {
    configProvider: {
      theme: {
        token: themeProvider.token,
      },
    },
  },

  request: {},

  access: {},

  headScripts: [{ src: "/scripts/loading.js", async: true }],

  presets: ["umi-presets-pro"],

  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",

      schemaPath: join(__dirname, "oneapi.json"),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath:
        "https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json",
      projectName: "swagger",
    },
  ],
  mfsu: {
    strategy: "normal",
  },
  requestRecord: {},
});
