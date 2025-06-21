import axios from "axios";
import { GET_USER } from "../constant/private";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useEffect } from "react";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(GET_USER + "/current", {
          withCredentials: true,
        });
        dispatch(setUserData(result?.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);
};

export default getCurrentUser;
