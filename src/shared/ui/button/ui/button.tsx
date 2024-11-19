import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './button.module.css';
import { Spinner } from '../../spinner/ui/spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}
export const Button = ({
  className,
  disabled,
  isLoading,
  onClick,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...props}
      className={classNames(`${s.control_buttons} ${s.default}`, className)}
    >
      {isLoading ? <Spinner className='text-[1em]' /> : children}
    </button>
  );
};
