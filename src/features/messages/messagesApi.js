/*eslint-disable */
import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io("http://localhost:9000", {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;
                    socket.on("message", (data) => {
                        updateCachedData((draft) => {
                            const conversation = draft;
                            conversation.push(data?.data);
                        });
                    });
                } catch (err) {}

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        addMessage: builder.mutation({
            query: (data) => ({
                url: "/messages",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
