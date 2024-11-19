import { useAppearanceDelay } from '@/shared/lib/useAppearanceDelay';
import styles from './page-spinner.module.css';
import { Spinner } from '../../spinner/ui/spinner';

export function PageSpinner({
  className = '',
  isLoading,
}: {
  className?: string;
  isLoading?: boolean;
}) {
  const isShown = useAppearanceDelay(isLoading, {
    minDisplay: 500,
    defaultValue: true,
  });

  if (!isShown) return null;

  return (
    <div className={`${styles.spinnerContainer} ${className}`}>
      <Spinner className={styles.spinner} />
    </div>
  );
}
