import { Outlet } from 'react-router-dom';
import classes from './app-layout.module.css';

export function AppLayout() {
  return (
    <main className={classes.main}>
      <Outlet />
    </main>
  );
}
