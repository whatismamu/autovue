import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import('@/views/home'),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/index',
                    component: () => import('@/views/firstPage'),
                    meta: { title: '首页' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/login.vue')
        },
        {
            path: '/404',
            component: () => import('@/views/404.vue')
        },
        {
            path: '/403',
            component: () => import('@/views/403.vue')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
