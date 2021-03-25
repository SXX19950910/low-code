
/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 17:44
 * @description：index
 * @update: 2021-03-16 17:44
 */
import {mapGetters, mapMutations} from 'vuex'
import { parseStyles } from '@/utils/style'

export default {
    install(Vue) {
        Vue.mixin({
            props: {
            },
            data() {
                return {
                }
            },
            computed: {
                ...mapGetters(['designForm', 'currentFormItem', 'collection']),
                current() {
                    const { elementId = '' } = this.currentFormItem
                    let result
                    const hasChild = data => data.field ? data.field.children.length > 0 : data.children.length > 0
                    const findChildren = (children) => {
                        children.map(item => {
                            if (item.elementId === elementId) result = item
                            else if (hasChild(item)) {
                                findChildren(item.field ? item.field.children : item.children)
                            }
                        })
                    }
                    this.designForm.map(item => {
                        if (item.elementId === elementId) {
                            result = item
                        } else if (item.field.children.length > 0) {
                            findChildren(item.field.children)
                        }
                    })
                    return result
                }
            },
            methods: {
                ...mapMutations({
                    insertComponent: 'INSERT_COMPONENT',
                    setCurrentComponent: 'SET_CURRENT_COMPONENT',
                    deleteComponent: 'DELETE_COMPONENT',
                    copyFormItem: 'COPY_FORM_ITEM'
                }),
                parseStyles(style, props) {
                    return parseStyles(style, props)
                }
            }
        })
    }
}
