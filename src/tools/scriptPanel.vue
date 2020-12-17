<template>
  <yl-drawer ref="script" class="script-panel-warp" :size="400" :visible.sync="visible" :modal="false" title="页面动作面板">
    <div class="content-warp">
      <vue-editor ref="editor" v-model="$store.state.lowCode.page.scriptText" class="editor" theme="vs-dark" language="javascript" :options="options" @change="debounceChange" />
    </div>
  </yl-drawer>
</template>

<script>
import ylDrawer from '@/components/Drawer'
import { debounce } from 'throttle-debounce'
import { mapMutations } from 'vuex'
import { parseFuncInstance } from '@/utils/event'
import vueEditor from 'vue-monaco'
export default {
  components: {
    ylDrawer,
    vueEditor
  },
  data() {
    return {
      visible: false,
      options: {
        fontSize: 13
      },
      debounceChange: Function,
      value: ''
    }
  },
  mounted() {
    this.debounceChange = debounce(800, this.getTransformFunc)
  },
  methods: {
    ...mapMutations({
      setGlobalMethods: 'SET_GLOBAL_METHODS'
    }),
    init() {
      this.visible = true
    },
    getTransformFunc(value) {
      const methods = parseFuncInstance(value)
      this.setGlobalMethods(methods)
    }
  }
}
</script>

<style lang="scss">
  .script-panel-warp {
    .content-warp {
      height: calc(100% - 22px);
      overflow: hidden auto;
      background-color: #1E1E1E;
      .editor {
        height: 100%;
      }
    }
  }
</style>
