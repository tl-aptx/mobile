import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        // 首页
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        // 问答
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        // 视频
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        // 我的
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
