import { createBrowserRouter } from 'react-router-dom'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import CreateProduct from '../features/products/pages/CreateProduct'
import AllProduct from '../features/products/pages/AllProduct'
import AllUserProduct from '../features/products/pages/AllUserProduct'
import ProtectSellerRoute from '../features/auth/components/ProtectSellerRoute'
import Protected from '../features/auth/components/Protected'
import Dashboard from '../features/products/pages/DashBoard'
import Navbar from '../features/auth/pages/Navbar'

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main>{children}</main>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
  path: '/seller',
  element: (
    <Protected>
      <ProtectSellerRoute>
        <Layout />
      </ProtectSellerRoute>
    </Protected>
  ),
  children: [
    {
      index: true,
      element: <Dashboard />
    },
    {
      path: 'create-product',
      element: <CreateProduct />
    },
    {
      path: 'my-products',
      element: <AllProduct />
    }
  ]
}
,
  {
    path: '/products',
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <AllUserProduct />
      }
    ]
  },
  {
    path: '/',
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    children: [
      {
        index: true,
        element:<AllUserProduct/>
      }
    ]
  },
])
