import { Icons } from '@/shared/assets';
import styles from './spinner.module.css';
import { Icon } from '../../icon';

interface ISpinner {
  width?: string;
  height?: string;
  className?: string;
}

export const Spinner = ({ width = '50px', height = '50px', className }: ISpinner) => {
  return (
    <div className={styles.spinnerContainer}>
      <Icon icon={Icons.SPINNER} className={className} width={width} height={height} />
    </div>
  );
};
