import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AUTH_URL } from '../constant/private';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [email, setEmail] = useState("rishu975@gmail.com");
    const [password, setPassword] = useState("anand123");

    const handleLogin = async (e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            const result = await axios.post(AUTH_URL+"/login", {
                email, password
            }, {withCredentials: true})
            dispatch(setUserData(result?.data))
            navigate("/")
            setLoading(false)
            setError("")
        }
        catch(err){
            console.log(err)
            setLoading(false)
            setError(err.response.data.message)
        }
    }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex justify-center items-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg
         shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
            <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] 
            shadow-gray-400 shadow-lg flex items-center justify-center'>
                <h1 className='text-gray-600 font-bold text-[30px]'>
                    Login to <span className='text-white'>chatly</span>
                </h1>
            </div>
            <form className='flex flex-col w-full gap-[20px] items-center'>
                
                <input type='email' placeholder='email' className='w-[90%] h-[60px]
                outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white
                rounded-lg hadhow-gray-400 shadow-lg'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                
                <div className='w-[90%] h-[60px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-400 shadow-lg relative'>
                    <input type={`${show ? "text" : "password"}`} placeholder='password' className='w-[90%] h-[60px]
                    outline-none border-2 px-[20px] py-[10px] bg-[white] text-gray-700 text-[19px]' 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    <span onClick={()=> setShow((prev)=> !prev)} className='absolute top-[13px] right-[20px] text-[19px] text-[#20c7ff] cursor-pointer font-semibold'>
                        {`${show ? "hidden" : "show"}`}
                    </span>
                </div>

                {error && <p className='font-bold text-red-500'>{error}</p>}

                <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl
                shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold
                hover:shadow-inner' onClick={handleLogin} type='submit' disabled={loading}>
                    {loading ? "loading..." : "login"}
                </button>

                <p>Want to create new account ? <span onClick={()=> navigate('/signup')} className='text-[#20c7ff] text-[bold] cursor-pointer'>sign up</span></p>
            </form>
        </div>
    </div>
  );
}

export default Login