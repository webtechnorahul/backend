import React from 'react'
// import Navbar from './src/features/shared/Navbar'
// import Footer from './src/features/shared/Footer'
import { Outlet } from 'react-router-dom'
const AppLayout = () => {
  return (
    <>
    <h1>navbar</h1>
    <Outlet/>
    <footer>footer content</footer>
    </>
    
  )
}

export default AppLayout