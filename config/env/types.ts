import { BuildMode } from '../build/types/types';

export type EnvVariables = Partial<{
  mode: BuildMode;
  analyzer: boolean;
  port: number;
  pwa: boolean;
}>;
