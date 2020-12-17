<template>
  <el-drawer
    title="我是标题"
    :append-to-body="true"
    :modal="false"
    destroy-on-close
    custom-class="event-drawer"
    close-on-press-escape
    :wrapper-closable="false"
    :visible.sync="visible"
    :with-header="false"
  >
    <div class="event-content">
      <vue-editor v-if="visible" v-model="currentEvent.event" class="code-box" language="javascript" theme="vs-code" @change="debounceChange" />
      <div class="bottom-handle">
        <span class="info-color fs-12 mr-15">编辑事件函数或自定义方法代码</span>
        <el-button type="primary" size="mini" @click="handleSubmit">保存 cmd+s</el-button>
        <el-button size="mini" @click="handleCancel">关闭 esc</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import vueEditor from 'vue-monaco'
import { mapGetters } from 'vuex'
import { debounce } from 'throttle-debounce'
export default {
  components: {
    vueEditor
  },
  props: {
    eventKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      initTextEvent: '',
      debounceChange: Function
    }
  },
  computed: {
    ...mapGetters(['designForm', 'currentFormItem']),
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
    },
    currentEvent() {
      return this.current.field.events.find(item => item.trigger === this.eventKey)
    }
  },
  mounted() {
    this.debounceChange = debounce(1000, this.inputEventChange)
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.initTextEvent = this.currentEvent ? this.currentEvent.event : ''
      })
    },
    handleCancel() {
      this.visible = false
      this.currentEvent.event = this.initTextEvent
    },
    handleSubmit() {
      this.visible = false
    },
    handleDeleteEvent(eventName) {
      this.visible = false
      this.current.field.events.map((item, index) => {
        if (item.eventName === eventName) this.current.field.events.splice(index, 1)
      })
    },
    inputEventChange(value) {
      const funcString = value.replace(/\s+/g, '')
      const end = funcString.indexOf('(')
      this.currentEvent.eventName = funcString.substring(8, end)
    }
  }
}
</script>

<style lang="scss">
  .el-drawer__wrapper {
    z-index: 150 !important;
  }
  .event-drawer {
    right: 300px !important;
    box-shadow: -3px 0 3px #EFECEC !important;
    background-color: $lightBackground;
    padding: 15px 15px 0 15px;
    width: 500px !important;
    .event-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      .code-box {
        height: 100%;
        background-color: white;
      }
      .bottom-handle {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 15px 0;
        justify-content: flex-end;
      }
    }
  }
</style>
