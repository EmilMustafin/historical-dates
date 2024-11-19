import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/types';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const { mode, paths, isAnalyzer, isDev, isProd } = options;

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.svg'),
    }),
    new DefinePlugin({
      __MODE__: JSON.stringify(mode),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(paths.src, 'shared', 'assets', 'icons', 'common'),
          to: path.resolve(paths.output, 'assets/icons'),
        },
      ],
    }),
  ];

  if (isDev) {
    plugins.push(
      new ProgressPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
    );
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      new ReactRefreshWebpackPlugin(),
    );
  }

  if (isAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
