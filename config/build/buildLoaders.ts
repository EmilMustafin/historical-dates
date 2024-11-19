import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { buildBabelLoader } from './babel/buildBabelLoader';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const { isDev } = options;

  const imagesAssetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
    generator: {
      filename: isDev ? 'assets/images/[name][ext]' : 'assets/images/[name].[hash:8][ext]',
    },
  };

  const fontsAssetLoader = {
    test: /\.(woff(2)?|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: isDev ? 'assets/fonts/[name][ext]' : 'assets/fonts/[name].[hash:8][ext]',
    },
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          typescript: true,
        },
      },
    ],
  };

  const styleLoaders = (cssOptions: {
    modules:
      | boolean
      | { namedExport: boolean; localIdentName: string; exportLocalsConvention: string };
  }) => [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        ...cssOptions,
      },
    },
  ];

  const cssModuleLoader = {
    test: /\.module\.css$/,
    use: styleLoaders({
      modules: {
        namedExport: false,
        localIdentName: isDev ? '[local]--[hash:base64:5]' : '[hash:base64:5]',
        exportLocalsConvention: 'as-is',
      },
    }),
  };

  const cssLoader = {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    use: styleLoaders({
      modules: false,
    }),
  };

  const babelLoader = buildBabelLoader(options);

  return [imagesAssetLoader, fontsAssetLoader, svgrLoader, cssModuleLoader, cssLoader, babelLoader];
}
