import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import { useAppState } from './useAppState'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { ProfilePage } from '../pages/ProfilePage'
import { ProviderPage } from '../pages/ProviderPage'
import { RatingPage } from '../pages/RatingPage'
import { SearchPage } from '../pages/SearchPage'
import { SupportPage } from '../pages/SupportPage'
import { TrackingPage } from '../pages/TrackingPage'

function RootRedirect() {
  const { isAuthenticated } = useAppState()

  return <Navigate replace to={isAuthenticated ? '/home' : '/login'} />
}

function ProtectedOutlet() {
  const { isAuthenticated } = useAppState()

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  return <Outlet />
}

function LoginGate() {
  const { isAuthenticated } = useAppState()

  if (isAuthenticated) {
    return <Navigate replace to="/home" />
  }

  return <LoginPage />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: <LoginGate />,
  },
  {
    element: <ProtectedOutlet />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/provider/:id',
        element: <ProviderPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/tracking',
        element: <TrackingPage />,
      },
      {
        path: '/rating',
        element: <RatingPage />,
      },
      {
        path: '/support',
        element: <SupportPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
