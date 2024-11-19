import { ICONS, Icons } from '@/shared/assets';

interface Props extends React.SVGProps<SVGSVGElement> {
  icon: Icons;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
}

export const Icon = ({ icon, className, ...rest }: Props) => {
  const Icon = ICONS[icon];

  return <Icon className={`${className ? className : ''}`} {...rest} />;
};
