import { PluginItem } from '@babel/core';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';
import { BuildOptions } from '../types/types';

export function buildBabelLoader({ isProd }: BuildOptions) {
  const plugins: PluginItem[] = [];

  if (isProd) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid'],
      },
    ]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
}
