/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 10:58
 * @description：index
 * @update: 2021-03-16 10:58
 */

export default {
    id: 'kmbeouy50',
    name: '按钮抽屉',
    classify: 'advanced',
    type: 'buttonDrawer',
    active: true,
    icon: 'iconfont iconchouti',
    menuName: 'button-drawer-options',
    component: () => import('./index'),
    field: $component.mergeCommon({
        icon: 'iconfont iconchouti',
        name: '按钮抽屉',
        type: 'buttonDrawer'
    })
}
