// src/App.jsx
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import getCurrentUser from './customHooks/getCurrentUser'
import getOtherUser from './customHooks/getOtherUsers'
import { useSelector, useDispatch } from 'react-redux'
import { setOnlineSocket } from './redux/onlineSocketSlice'
import { SocketProvider, useSocket } from './content/SocketContext'

const InnerApp = () => {
  getCurrentUser()
  getOtherUser()

  const userData = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    if (!socket) return;

    socket.on('getOnlineUsers', (users) => {
      dispatch(setOnlineSocket(users));
    });

    return () => socket.off('getOnlineUsers');
  }, [socket]);

  return (
    <Routes>
      <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path='/signup' element={!userData ? <Signup /> : <Navigate to="/profile" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />
    </Routes>
  )
}

const App = () => {
  const userData = useSelector((store) => store.user)

  return (
    <SocketProvider userId={userData?._id}>
      <InnerApp />
    </SocketProvider>
  )
}

export default App
