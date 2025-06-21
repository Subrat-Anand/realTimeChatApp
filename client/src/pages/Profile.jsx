import React, { useRef, useState } from 'react'
import DP from '../assets/DP.png'
import { TiSocialInstagramCircular } from "react-icons/ti";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { BASE_URL } from '../constant/private';
import { setUserData } from '../redux/userSlice';

const Profile = () => {

    const userData = useSelector((store)=>store.user)
    const navigate = useNavigate()
    const image = useRef()
    const dispatch = useDispatch()

    const [name, setName] = useState(userData.name || "");
    const [frontendImage, setFrontendImage] = useState(userData.image || DP)
    const [backendImage, setBackendImage] = useState(null)
    const [saving, setSaving] = useState(false)

    const handleChange = (e)=>{
      const file = e.target.files[0]
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }

    const handleSubmit = async(e)=>{
      setSaving(true)
      e.preventDefault();
      try{
        const formData = new FormData()
        formData.append("name", name)
        if(backendImage){
          formData.append("image", backendImage)
        }

        const result = await axios.put(BASE_URL+"/user/profile", formData, {
          withCredentials: true
        })
        dispatch(setUserData(result?.data))
        setSaving(false)
        navigate("/")
      }
      catch(err){
        setSaving(false)
        console.log(err)
      }
    }

  return (
    <div className='w-full gap-[20px] h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
        <div className='fixed top-[20px] left-[20px]'>
          <IoMdArrowRoundBack className='w-[30px] h-[30px] cursor-pointer' onClick={()=> navigate("/")}/>  
        </div>
        <div className='bg-white border-4 border-gray-500 rounded-full
         shadow-gray-400 shadow-lg relative'>
           <div className='w-[200px] flex items-start justify-center h-[200px] overflow-hidden rounded-full shadow-lg'>
              <img
                src={frontendImage}
                alt="frontend"
                className='w-full h-full object-cover'
              />
          </div>

            <TiSocialInstagramCircular
                className="absolute top-10 -right-4 w-[45px] h-[45px]
              text-white bg-gradient-to-tr from-[rgba(255,32,110,0.99)] via-[rgba(255,32,110,0.99)] to-[rgba(255,32,110,0.99)]
                rounded-full shadow-2xl cursor-pointer"
                onClick={()=>image.current.click()}
            />
        </div>
        <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] justify-center items-center'>

            <input hidden accept='image/*' ref={image} type='file' onChange={handleChange}/>
            <input type='text' placeholder='Enter your name' className='w-[90%] h-[60px]
                outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white
                rounded-lg text-gray-700 shadow-lg' value={name} onChange={((e)=> setName(e.target.value))}/>

            <input type='text' readOnly className='w-[90%] h-[60px]
                outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white
                rounded-lg text-gray-400 shadow-lg' value={userData.username}/>

            <input type='email' readOnly className='w-[90%] h-[60px]
                outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white
                rounded-lg text-gray-400 shadow-lg' value={userData.email}/>

            <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl
            shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold
              hover:shadow-inner' type='submit' onClick={handleSubmit} 
              disabled={saving}>{!saving ? "Save" : "Saving..."}
           </button>
        </form>
    </div>
  )
}

export default Profile