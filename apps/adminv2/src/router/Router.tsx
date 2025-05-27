import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path='/' element={<div>Home Page</div>} />
      </Route>
    </>,
  ),
  {
    basename: '/adminv2',
  },
);

export const Router = () => {
  return <RouterProvider router={router} />;
};

export default router;
