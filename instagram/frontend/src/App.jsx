import React from 'react'
import { router } from './app.routes'
import { RouterProvider } from 'react-router-dom'
import './shared/style.scss'
import { AuthProvider } from './features/auth/auth.context'
import { PostProvider } from './features/home/post.context'
function App() {

  return (
    <>
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={router}/>
      </PostProvider>
    </AuthProvider>
    </>
  )
}

export default App
