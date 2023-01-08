import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Auth from './components/login/Auth'
import Home from './components/home/Home'

import PocketBase from 'pocketbase';

function App() {

  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  let pb = ""
        try {
            pb = new PocketBase('http://127.0.0.1:8090');
        } catch (err) {
            console.log(err.isAbort);
        }

  


  const navigate = useNavigate()

  useEffect(() => {
    navigate(!isLoggedIn ? "/auth" : "/home")
  }, [navigate, isLoggedIn])

  return (
      <Routes>
        <Route path="/auth" element={<Auth setisLoggedIn = {setisLoggedIn} setUser = {setUser} pb= {pb}/>} />
        <Route path="/home" element={<Home user = {user} pb = {pb}/>} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
  );
}

export default App
