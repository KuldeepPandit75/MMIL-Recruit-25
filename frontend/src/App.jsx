import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Rocket from './components/OpeningSlide/Rocket/Rocket.jsx'
import Splashscreen from './components/OpeningSlide/splashscreen/Splashscreen.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Register/Login.jsx'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Splashscreen />} />
        <Route path='/Rocket' element={<Rocket/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
