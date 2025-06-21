// ✅ Correct way to import for latest redux-toolkit versions
import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import otherUserSliceReducer from './otherUserSlice';
import selectedUserReducer from './selectedUser';
import messageReducer from './messagesSlice';
import onlineSocketReducer from './onlineSocketSlice';
import socketReducer from './socketSlice';
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    otherUser: otherUserSliceReducer,
    selectedUser: selectedUserReducer,
    messages: messageReducer,
    onlineSocket: onlineSocketReducer,
    socket: socketReducer,
    search: searchReducer
  }
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // ✅ allow socket instance
  //   }),
});
