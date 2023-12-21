import axios from "axios";

export const $axios = axios.create({
    baseURL: 'https://social-backend-9yb5.onrender.com'
})