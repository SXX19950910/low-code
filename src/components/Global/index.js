/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 10:53
 * @description：index
 * @update: 2021-03-16 10:53
 */

import setComponent from './SetComponent'
import dragComponent from './DragComponent'
import menuOptions from '@/public/MenuOptions'
import draggable from 'vuedraggable'

export default [
    setComponent,
    dragComponent,
    {
        name: 'draggable',
        component: draggable
    },
    ...menuOptions
]
