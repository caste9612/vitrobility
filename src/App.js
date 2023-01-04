import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Auth from './components/Login/Auth'
import Home from './components/Home/Home'

function App() {

  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    navigate(!isLoggedIn ? "/auth" : "/home")
  }, [navigate, isLoggedIn])

  return (
      <Routes>
        <Route path="/auth" element={<Auth setisLoggedIn = {setisLoggedIn} setUser = {setUser} />} />
        <Route path="/home" element={<Home user = {user} />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
  );
}

export default App
