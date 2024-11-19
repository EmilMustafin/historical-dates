import path from 'path';
import { config } from 'dotenv';
import { Configuration } from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildOptions, BuildPaths } from './config/build/types/types';
import { EnvVariables } from './config/env/types';

config();

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'dist'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  };

  const options: BuildOptions = {
    port: env.port ?? 3000,
    mode: env.mode ?? BuildMode.PRODUCTION,
    paths,
    isAnalyzer: Boolean(env.analyzer),
    isDev: env.mode === BuildMode.DEVELOPMENT,
    isProd: env.mode === BuildMode.PRODUCTION,
    autoOpen: JSON.parse(process.env.AUTO_OPEN ?? 'true'),
  };

  const config: Configuration = buildWebpack(options);

  return config;
};
