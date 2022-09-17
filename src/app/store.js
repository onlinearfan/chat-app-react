/*eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from "../features/auth/authSlice";
import conversationsReducer from '../features/conversation/conversationsSlice';
import messagesReducer from '../features/messages/messagesSlice';
export const store = configureStore({
    reducer: {
        // [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
        conversations:conversationsReducer,
        messages:messagesReducer
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});