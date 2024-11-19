import Spinner from '../common/spinner.svg';

export enum Icons {
  SPINNER = 'SPINNER',
}

export const ICONS: Record<Icons, SVGIcon> = {
  [Icons.SPINNER]: Spinner,
};
