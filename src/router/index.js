import Router from 'vue-router'
import edit from './edit'
import Vue from 'vue'
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/home/index.vue'),
            hidden: true,
            meta: {
                title: '低代码平台'
            }
        },
        edit
    ]
})

export default router
