// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Back_end } from '../constant/private';

const SocketContext = createContext();

export const SocketProvider = ({ children, userId }) => {
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(Back_end, {
      query: { userID: userId }
    });

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
      setSocketInstance(null);
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
