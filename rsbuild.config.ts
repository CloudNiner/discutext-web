import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_"] });

const ReactCompilerConfig = {};

export default defineConfig({
  output: {
    distPath: {
      root: "build",
    },
  },
  html: {
    template: "./public/index.html",
  },
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift([
          "babel-plugin-react-compiler",
          ReactCompilerConfig,
        ]);
      },
    }),
  ],
  source: {
    define: {
      "process.env": publicVars,
    },
  },
});
