import webpack from "webpack";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
      publicPath: "/",
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    optimization: isDev
      ? undefined
      : {
          splitChunks: {
            chunks: "all",
            minChunks: 2,
          },
          minimizer: [`...`, new CssMinimizerPlugin()],
        },
    resolve: buildResolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
