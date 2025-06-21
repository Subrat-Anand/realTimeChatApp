import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DP from '../assets/DP.png';
import { selectedUser } from '../redux/selectedUser';
import { MdEmojiEmotions } from 'react-icons/md';
import { IoImages } from 'react-icons/io5';
import { FaArrowUp } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import SenderMessage from './SenderMessage';
import RecieverMessage from './RecieverMessage';
import { BASE_URL } from '../constant/private';
import { setMessages } from '../redux/messagesSlice';
import { useSocket } from '../content/SocketContext';

const MessageArea = () => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [input, setInput] = useState('');
  const [frontEndImage, setFrontEndImage] = useState(null);
  const [backEndImage, setBackEndImage] = useState(null);

  const dispatch = useDispatch();
  const selectedUser1 = useSelector((store) => store.selectedUser);
  const userData = useSelector((store) => store.user);
  const messages = useSelector((store) => store.messages);
  const imageRef = useRef();
  const socket = useSocket(); // 👈 Get socket from context

  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.length == 0 && backEndImage == null) return;

    try {
      const formData = new FormData();
      formData.append('message', input);
      if (backEndImage) {
        formData.append('image', backEndImage);
      }

      // Clear input instantly after sending
      setInput('');
      setFrontEndImage(null);
      setBackEndImage(null);

      const result = await axios.post(
        `${BASE_URL}/user/send/${selectedUser1._id}`,
        formData,
        { withCredentials: true }
      );

      dispatch(setMessages([...messages, result.data]));

      // Emit message to server
      socket?.emit("sendMessage", result.data); // 👈 Optional
    } catch (err) {
      console.error('Send Message Error:', err);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackEndImage(file);
      setFrontEndImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMsg) => {
      dispatch(setMessages([...messages, newMsg]));
    });

    return () => socket.off("newMessage");
  }, [socket, messages]);

  return (
    <div className={`lg:w-[70%] relative w-full h-full bg-slate-200 border-l-2 border-gray-300 ${selectedUser1 ? 'block' : 'hidden'} lg:block`}>
      {selectedUser1 && (
        <div className='w-full h-[100px] bg-[#20c7ff] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-[20px] gap-3 fixed z-50'>
          <div className='cursor-pointer'>
            <IoMdArrowRoundBack className='w-[30px] h-[30px]' onClick={() => dispatch(selectedUser(null))} />
          </div>
          <div className='w-[50px] h-[50px] overflow-hidden rounded-full shadow-gray-500 shadow-lg'>
            <img
              src={selectedUser1?.image || DP}
              className='h-full w-full object-cover cursor-pointer'
              alt="user"
            />
          </div>
          <h1 className='text-gray-800 text-[20px] font-semibold'>{selectedUser1?.name || 'User'}</h1>
        </div>
      )}

      {!selectedUser1 && (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h1 className='text-gray-700 font-bold text-[50px]'>Welcome to Chatly</h1>
          <span className='text-gray-700 font-bold text-[30px]'>Chat Friendly!</span>
        </div>
      )}

      {selectedUser1 && (
        <div className='w-full h-[100vh] flex flex-col'>
          <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center'>
            <form
              className='w-[95%] lg:w-[70%] flex items-center gap-[20px] h-[60px] bg-[#20c7ff] rounded-full shadow-gray-500 shadow-lg p-4'
              onSubmit={handleSendMessage}
            >
              {frontEndImage && (
                <img
                  src={frontEndImage}
                  alt="preview"
                  className='w-[80px] absolute top-[-70px] right-[15%] rounded-lg shadow-gray-500 shadow-lg'
                />
              )}
              <div onClick={() => setEmojiPicker((prev) => !prev)}>
                <MdEmojiEmotions className='w-[25px] h-[25px] text-white cursor-pointer' />
              </div>
              <input
                type='text'
                className='w-full h-full outline-none border-0 text-[19px] px-[10px] text-white bg-transparent placeholder-white'
                placeholder='Message'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <input
                type='file'
                accept='image/*'
                hidden
                ref={imageRef}
                onChange={handleImage}
              />
              <div>
                <IoImages className='w-[25px] h-[25px] text-white cursor-pointer' onClick={() => imageRef.current.click()} />
              </div>
                
                <button type='submit'>
                  <FaArrowUp className='w-[25px] h-[25px] text-white cursor-pointer' />
                </button>
              
            </form>
          </div>

          <div className='w-full h-[610px] flex flex-col py-[20px] px-[30px] overflow-auto gap-[20px]'>
            {emojiPicker && (
              <div className='absolute bottom-[150px] left-[20px] z-50'>
                <EmojiPicker width={350} height={450} className='shadow-lg' onEmojiClick={onEmojiClick} />
              </div>
            )}

            {messages && messages.map((mess) =>
              mess.sender === userData._id ? (
                <SenderMessage key={mess._id} image={mess.image} message={mess.message} />
              ) : (
                <RecieverMessage key={mess._id} image={mess.image} message={mess.message} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
