// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/forget-password',
        name: 'ForgetPassword',
        component: () => import('@/views/ForgetPassword.vue')
      },
      {
        path: '/confirm-email',
        name: 'confirmEmail',
        component: () => import('@/views/ConfirmEmail.vue')
      }
    ]
  },
  {
    path: '/main',
    component: () => import('@/layouts/main/Default.vue'),
    meta: { needAuth: true } ,
    children: [
      {
        path: '/posts',
        name: 'Posts',
        component: () => import('@/views/Posts.vue'),
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/ProfileSetting.vue')
      },
      {
        path: 'profile/:id',
        name: 'Profile',
        component: () => import('@/views/Profile.vue')
      }
    ],
  },
  {
    path:'/:catchAll(.*)',
    name:'error',
    component: () => import('@/views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(route=>route.meta.needAuth)){
    const accessToken = useCookies().cookies.get('Access-Token')
    if(accessToken){
      next()
    }else{
      next({ name: 'Home' })
    }
  }else{
    next()
  }
})

export default router