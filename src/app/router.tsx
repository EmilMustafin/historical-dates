import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home-page';
import { ROUTER_PATHS } from '@/shared/constants';
import { Error } from '@/widgets/error';
import { AppLayout } from './layout/app-layout';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: ROUTER_PATHS.HOME,
        element: <HomePage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
