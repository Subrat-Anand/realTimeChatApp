import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DP from '../assets/DP.png';
import { FaSearch } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import { AUTH_URL, BASE_URL, GET_USER } from '../constant/private';
import { setUserData } from '../redux/userSlice';
import { setOtherUser } from '../redux/otherUserSlice';
import { useNavigate } from 'react-router-dom';
import { selectedUser } from '../redux/selectedUser';
import { setSearchData } from '../redux/searchSlice';
import { useEffect } from 'react';

const Sidebar = () => {
  const userData = useSelector((store) => store.user);
  const otherUser = useSelector((store) => store?.otherUser);
  const currentSelectedUser = useSelector((store) => store?.selectedUser);
  const onlineSocket = useSelector((store)=> store.onlineSocket)
  const searchData = useSelector((store)=> store.search)
  console.log(searchData)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("")

  const handleLogout = async () => {
    try {
      await axios.post(AUTH_URL + "/logout", {}, { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setOtherUser(null));
      dispatch(selectedUser(null))
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

      useEffect(() => {
      if (!input.trim()) return; // input empty ho to skip

      const delayDebounce = setTimeout(async () => {
        try {
          const result = await axios.get(`${GET_USER}/search?query=${input}`, {
            withCredentials: true,
          });
          dispatch(setSearchData(result.data));
        } catch (err) {
          console.log(err);
        }
      }, 500); // debounce: 500ms

      return () => clearTimeout(delayDebounce); // cleanup debounce timer
    }, [input]);

  return (
    <div className={`lg:w-[30%] w-full h-full bg-slate-200 ${currentSelectedUser ? "hidden" : "block"} lg:block`}>
      <div className='w-[60px] h-[60px] bg-blue-500 overflow-hidden rounded-full shadow-gray-500 shadow-lg flex justify-center items-center fixed bottom-[20px] left-[10px]'>
        <CiLogout className='w-[25px] h-[25px] cursor-pointer' onClick={handleLogout} />
      </div>

       {searchData?.map((users) => {
                    return (
                      <div key={users._id} id={users._id}> {/* ✅ key yahin hona chahiye */}
                        <div className='relative rounded-full shadow-gray-500 shadow-lg flex justify-center items-center'>
                          <div className='w-[60px] h-[60px] overflow-hidden rounded-full shadow-gray-500 shadow-lg'>
                            <img src={users.image || DP} alt="other-user" className='h-full w-full object-cover' />
                          </div>
                          <span className='w-[15px] h-[15px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
                        </div>
                      </div>
                    );
                  })}

      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
        <h1 className='font-bold text-[25px] text-white'>Chatly</h1>
        <div className='flex items-center justify-between w-full mt-2'>
          <h1 className='font-bold text-[25px] text-gray-700'>Hii, {userData?.name || "User"}</h1>
          <div className='w-[60px] h-[60px] overflow-hidden rounded-full shadow-gray-500 shadow-lg'>
            <img
              src={userData.image || DP}
              className='h-full w-full object-cover cursor-pointer'
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>

        <div className='w-full flex items-center gap-[20px] mt-4 overflow-y-auto'>
          {
            !search ? (
              <div className='w-[60px] h-[60px] bg-white overflow-hidden rounded-full shadow-gray-500 shadow-lg flex justify-center items-center'>
                <FaSearch className='w-[25px] h-[25px] cursor-pointer' onClick={() => setSearch(true)} />
              </div>
            ) : (
              <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] rounded-full overflow-hidden'>
                <FaSearch className='w-[25px] h-[25px] cursor-pointer ml-4 relative' onClick={() => setSearch(false)} />
                <input
                  type='text'
                  placeholder='search user...'
                  className='w-full h-full border-0 outline-0 px-2'
                  value={input}
                  onChange={(e)=> setInput(e.target.value)}
                />
              </form>
            )
          }
        </div>

          <div className='w-full flex items-center gap-3 flex-wrap px-[20px]'>
          {!search &&
            otherUser?.map((user) => (
              onlineSocket?.includes(user._id) && 
              <div className='relative rounded-full shadow-gray-500 shadow-lg flex justify-center items-center'>
                <div key={user._id} className='w-[60px] h-[60px] overflow-hidden rounded-full shadow-gray-500 shadow-lg' onClick={() => dispatch(selectedUser(user))}>
                  <img src={user.image || DP} alt="other-user" className='h-full w-full object-cover' />
                </div>
                <span className='w-[15px] h-[15px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
              </div>
            ))
          }
          </div>
       
      </div>

      <div className='w-full h-[60vh] overflow-auto flex flex-col gap-[20px] p-2 items-center mt-[20px]'>
        {
          otherUser?.map((user) => (
            <div key={user._id} className='w-[95%] h-[60px] flex items-center gap-[20px] bg-white shadow-gray-500 shadow-lg rounded-full px-3 cursor-pointer' onClick={() => dispatch(selectedUser(user))}>
              <div className='w-[50px] h-[50px] overflow-hidden rounded-full shadow-md'>
                <img src={user.image || DP} alt="other-user" className='h-full w-full object-cover' />
              </div>
              <h1 className='text-[16px] font-medium'>{user.name || user.username}</h1>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Sidebar;
