import { createBrowserRouter } from 'react-router';
import MainLayout from '../layout/MainLayout';
import Homepage from '../pages/Homepage';
import AboutUs from '../pages/AboutUs';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import PrivateRoute from '../privateRoute/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/aboutUs',
        element: <AboutUs />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
]);
