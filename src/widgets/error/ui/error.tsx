import { Link } from 'react-router-dom';
import s from './error.module.css';
export const Error = () => {
  return (
    <section className={s.error} data-testid='error' id='error'>
      <h1 className={s.error_title}>404</h1>
      <p className={s.error_text}>
        Page not found. The page you are looking for does not exist.Go to{' '}
        <Link className={s.error_link} to='/'>
          Home
        </Link>
      </p>
    </section>
  );
};
