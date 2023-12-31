import socket from "socket.io-client";

const url = import.meta.env.VITE_URL
export const io = socket(url,{
    withCredentials: true,
    autoConnect: false,
    transports: ['websocket']
})

io.on('connect',()=>{
    console.log('connected to server')
})
io.on('disconnect',()=>{
    console.log('disconnected to server')
})