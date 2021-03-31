/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 16:25
 * @description：index
 * @update: 2021-03-16 16:25
 */
import buttonDrawerOptions from './ButtonDrawer'
import eventOptions from './Event'
import dataOptions from './Data'
import pageOptions from './Page'
import styleOptions from './Style'
import pageStyle from './PageStyle'
import webNavOptions from './WebNav'
import gridOptions from './Grid'
import containerOptions from './Container'
import customButtonOptions from './CustomButton'

export default [
    {
        name: 'button-drawer-options',
        component: buttonDrawerOptions
    },
    {
        name: 'event-options',
        component: eventOptions
    },
    {
        name: 'data-options',
        component: dataOptions
    },
    {
        name: 'page-options',
        component: pageOptions
    },
    {
        name: 'style-options',
        component: styleOptions
    },
    {
        name: 'page-style',
        component: pageStyle
    },
    {
        name: 'web-nav-options',
        component: webNavOptions
    },
    {
        name: 'grid-options',
        component: gridOptions
    },
    {
        name: 'container-options',
        component: containerOptions
    },
    {
        name: 'custom-button-options',
        component: customButtonOptions
    }
]
