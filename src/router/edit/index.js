/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 9:54
 * @description：index
 * @update: 2021-03-16 9:54
 */

const edit = () => import('@/views/edit/index.vue')

export default {
    path: '/edit',
    name: 'Edit',
    component: edit,
    meta: {
        title: '页面设计'
    }
}
