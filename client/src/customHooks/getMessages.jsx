import axios from "axios";
import { BASE_URL} from "../constant/private";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useEffect } from "react";
import { setMessages } from "../redux/messagesSlice";

const getMessages = () => {
  const dispatch = useDispatch();
  const selectedUser1 = useSelector((store)=> store.selectedUser)

  useEffect(() => {
    const fetchMessages = async () => {
      try {

        if (!selectedUser1) return;

        const result = await axios.get(BASE_URL + "/user/get/" + selectedUser1._id, {
          withCredentials: true,
        });
        dispatch(setMessages(result?.data));
      }
      catch (err) {
      if (err.response && err.response.status === 400) {
          console.log("No messages found");
          dispatch(setMessages([])); // 👈 VERY IMPORTANT
      } else {
        console.log("Get Message Error:", err);
      }
    }
    };

    fetchMessages();
  }, [selectedUser1]);
};

export default getMessages;
