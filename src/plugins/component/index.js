/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 11:12
 * @description：index
 * @update: 2021-03-16 11:12
 */
import _ from 'loadsh'

export default {
    common: {
        api: '',
        change: '',
        children: Array(0),
        dataOrigin: 'local',
        defaultValue: '',
        focus: '',
        icon: '',
        id: '',
        labelVisible: true,
        moreBtnVisible: false,
        moreSliceNumber: 3,
        name: '',
        options: Array(0),
        params: '',
        paramsKey: '',
        props: '',
        quick: Array(0),
        rule: '',
        select: '',
        setup: '',
        type: '',
        value: '',
        visible: true
    },
    mergeCommon(origin) {
        // 合并公共属性
        return _.assign(_.cloneDeep(this.common), origin)
    }
}
