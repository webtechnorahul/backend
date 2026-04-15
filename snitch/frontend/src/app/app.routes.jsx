import { createBrowserRouter } from 'react-router-dom'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import Navbar from '../features/auth/pages/Navbar'

export const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path:"/",
    element:<Navbar/>
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element:<h1>hello</h1>,
  },
])
