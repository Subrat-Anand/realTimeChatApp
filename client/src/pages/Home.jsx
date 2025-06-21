import React from 'react'
import Sidebar from '../Components/Sidebar'
import MessageArea from '../Components/MessageArea'
import getMessages from '../customHooks/getMessages'
import usegetOtherUser from '../customHooks/getOtherUsers'

const Home = () => {
      getMessages()
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}

export default Home