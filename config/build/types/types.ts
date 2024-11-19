export interface BuildPaths {
  entry: string;
  html: string;
  public: string;
  output: string;
  src: string;
}

export enum BuildMode {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  isAnalyzer: boolean;
  isDev: boolean;
  isProd: boolean;
  autoOpen: boolean;
}
