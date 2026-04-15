import {createBrowserRouter} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/home/pages/Home'
import AppLayout from '../AppLayout'
export const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
        element:<AppLayout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'/post',
                element:<h1>post page</h1>
            }
        ]
    }
])