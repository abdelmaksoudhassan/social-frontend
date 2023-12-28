import socket from "socket.io-client";
import { useCookies } from "vue3-cookies";

export const io = socket('https://social-backend-9yb5.onrender.com',{
    withCredentials: true,
    autoConnect: false,
    transports: ['websocket'],
    // auth:{
    //     Authorization: `Bearer ${useCookies().cookies.get('Access-Token')}`
    // }
})

io.on('connect',()=>{
    console.log('connected to server')
})
io.on('disconnect',()=>{
    console.log('disconnected to server')
})