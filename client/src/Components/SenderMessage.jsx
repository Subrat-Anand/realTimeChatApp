import React, { useEffect, useRef } from 'react'
import DP from '../assets/DP.png'

const SenderMessage = ({image, message}) => {

  const scroll = useRef()
   useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [image, message]) // Scroll jab image ya message aaye

  const handleImage = ()=>{
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className='w-fit max-w-[500px] bg-[#8120ff] px-[20px] py-[5px] 
    text-white rounded-tr-none rounded-2xl text-[19px] relative right-0
     ml-auto  shadow-gray-500 shadow-lg flex flex-col gap-[10px]' ref={scroll}>
     {
      image && <img src={image} className='w-[150px] rounded-lg' onLoad={handleImage}/>
     }
     {
      message && <span>{message}</span>
     }
    </div>
  )
}

export default SenderMessage