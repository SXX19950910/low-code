/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-24 17:31
 * @description：index
 * @update: 2021-03-24 17:31
 */

export default {
    id: 'kmbeouy51',
    name: '栅格布局',
    classify: 'layout',
    type: 'grid',
    active: true,
    icon: 'iconfont icon35zhage',
    menuName: 'grid-options',
    component: () => import('./index.vue'),
    field: $component.mergeCommon({
        icon: 'iconfont icon35zhage',
        name: '栅格布局',
        type: 'grid'
    })
}
