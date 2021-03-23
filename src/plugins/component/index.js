import _ from "_loadsh@0.0.4@loadsh";
import {generateId} from "@/utils/global";

/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 11:12
 * @description：index
 * @update: 2021-03-16 11:12
 */

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
        return Object.assign(this.common, origin)
    },
    updateFormItemId(updateData) {
        const isLayout = type => ['grid', 'buttonDrawer'].includes(type)
        const data = _.cloneDeep(updateData)
        data.elementId = generateId()
        const set = (children) => {
            children.map((item, index) => {
                item.elementId = `${item.elementId}${index}`
            })
        }
        if (isLayout(data.type)) {
            data.field.children.map((item, index) => {
                item.elementId = `${item.elementId}${index}`
                item.parentId = `${data.elementId}`
                if (item.children && item.children.length > 0) {
                    set(item.children)
                }
            })
        }
        return data
    }
}
