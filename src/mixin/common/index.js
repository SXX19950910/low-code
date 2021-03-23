
/**
 * @name: index
 * @author: shixiaoxi
 * @date: 2021-03-16 17:44
 * @description：index
 * @update: 2021-03-16 17:44
 */
import { mapGetters } from 'vuex'

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
                ...mapGetters(['designForm', 'currentFormItem'])
            },
            methods: {
                getBindProps(current) {
                    console.log(current)
                }
            }
        })
    }
}
