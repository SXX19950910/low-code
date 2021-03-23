/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 10:48
 * @description：index
 * @update: 2021-03-16 10:48
 */

export default {
    id: 'kmbeouy650',
    name: '导航栏',
    component: () => import('./index'),
    type: 'webNav',
    classify: 'web',
    active: true,
    icon: 'iconfont icon26slider',
    menuName: 'web-nav-options',
    field: $component.mergeCommon({
        icon: 'iconfont icon26slider',
        name: '导航栏',
        type: 'webNav'
    })
}
