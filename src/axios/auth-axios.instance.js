import { useCookies } from "vue3-cookies";
import axios from "axios";
import { $axios } from "./axios.instance";

const { cookies } = useCookies()
const jwtInterceptor = axios.create({})

jwtInterceptor.interceptors.request.use(config=>{
    config.baseURL = 'https://social-backend-9yb5.onrender.com'
    const accessToken = cookies.get('Access-Token')
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
})
jwtInterceptor.interceptors.response.use(
    (response)=>{
        return response
    },
    async (error)=>{
        if(error.response && error.response.status == 401){
            const refresh = cookies.get('Refresh-Token')
            const response = await $axios.get('/auth/refresh' ,{
                headers: {'refresh':  refresh}, withCredentials: true
            }).catch(err=>{
                return Promise.reject(err)
            })
            if(response && response.data){
                cookies.set('Access-Token',response.data)
                return $axios(error.config)
            }else{
                return Promise.reject(error)
            }
        }else{
            return Promise.reject(error)
        }
    }
)
export default jwtInterceptor