declare module '*.module.css' {
  const classes: { [key: string]: string };
  export = classes;
}
declare type SVGIcon = React.VFC<React.SVGProps<SVGSVGElement>>;

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  const SVG: SVGIcon;
  export default SVG;
}

declare interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skipWaiting?: any;
}

declare const __MODE__: 'production' | 'development';
declare const __IS_PWA__: boolean;
