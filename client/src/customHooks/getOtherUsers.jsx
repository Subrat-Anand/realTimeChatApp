import axios from "axios";
import { GET_USER } from "../constant/private";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setOtherUser } from "../redux/otherUserSlice";

const getOtherUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(GET_USER + "/others", {
          withCredentials: true,
        });
        console.log("Other users fetched: ", result.data); // ✅
        dispatch(setOtherUser(result.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);
};

export default getOtherUser;
