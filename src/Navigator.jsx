import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Users from './Pages/Users'
import Trucks from './Pages/Trucks'
import Products from './Pages/Products'
import Livraisons from './Pages/Livraisons'

const Navigator = () => {
  const user = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/trucks" element={<Trucks />} />
            <Route path="/products" element={<Products />} />
            <Route path="/livraisons" element={<Livraisons />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default Navigator
