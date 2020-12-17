import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/design',
            name: 'Design',
            component: () => import('@/views/home/index.vue'),
            hidden: true,
            meta: {
                title: '低代码平台'
            },
            children: [
                {
                    path: 'edit',
                    name: 'DesignEdit',
                    component: () => import('@/views/edit/index.vue'),
                    meta: {
                        title: '页面设计'
                    }
                },
                // {
                //     path: 'template',
                //     name: 'DesignTemplate',
                //     component: () => import('@/views/setting/design/template/index.vue'),
                //     meta: {
                //         title: '设计模板'
                //     }
                // }
            ]
        }
    ]
})

export default router
