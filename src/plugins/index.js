/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 11:22
 * @description：index
 * @update: 2021-03-16 11:22
 */

import $component from './component'

const $plugins = {
    plugins: {
        $component
    },
    create() {
        for (const key in this.plugins) {
            window[key] = this.plugins[key]
        }
    }
}

$plugins.create()
