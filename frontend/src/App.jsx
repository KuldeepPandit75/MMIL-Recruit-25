import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Rocket from './components/Rocket/Rocket.jsx'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path='/' element={<Splashscreen />} /> */}
        <Route path='/Rocket' element={<Rocket/>}/>
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
