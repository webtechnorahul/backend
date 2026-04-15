import {createBrowserRouter} from 'react-router-dom'
import Register from './feature/auth/pages/Register'
import Login from './feature/auth/pages/Login'
import Dashboard from './feature/chat/pages/Dashboard'
export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:'/',
        element:<Dashboard/>
    }
])