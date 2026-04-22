import { createBrowserRouter } from 'react-router-dom'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import CreateProduct from '../features/products/pages/CreateProduct'
import AllProduct from '../features/products/pages/AllProduct'
import AllUserProduct from '../features/products/pages/AllUserProduct'
import ProtectSellerRoute from '../features/auth/components/ProtectSellerRoute'
import Protected from '../features/auth/components/Protected'
import Dashboard from '../features/products/pages/DashBoard'
import Navbar from '../features/shared/components/Navbar'
import ProductDetail from '../features/products/pages/ProductDetail'
import Footer from '../features/shared/components/Footer'

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#0e0e11]">
    <Navbar />
    <main>{children}</main>
    <Footer />
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
  element: <ProtectSellerRoute/>,
  children: [
    {
      index: true,
      element: <Dashboard/>
    },
    {
      path: 'create-product',
      element: <CreateProduct/>
    },
    {
      path: 'my-products',
      element: <AllProduct/>
    }
  ]
}
,
  {
    path: '/products',
    element:<Protected/>,
    children: [
      {
        index: true,
        element: <Layout>
          <AllUserProduct />
        </Layout>
      },
      {
        path:':id',
        element:<Layout>
          <ProductDetail/>
        </Layout>
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
        element:<Layout>
          <AllUserProduct/>
        </Layout>

      }
    ]
  },
])
