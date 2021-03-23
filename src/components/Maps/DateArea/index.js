/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 14:00
 * @description：index
 * @update: 2021-03-16 14:00
 */

export default {
    id: 'kmbeouy648',
    name: '时间范围',
    classify: 'basic',
    type: 'dateArea',
    active: true,
    icon: 'iconfont icongongyingshangshixiao',
    menuName: 'data-area-options',
    component: () => import('./index'),
    field: $component.mergeCommon({
        icon: 'iconfont icongongyingshangshixiao',
        name: '时间范围',
        type: 'dateArea'
    })
}
