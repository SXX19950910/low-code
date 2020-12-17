<template>
  <el-dialog v-el-drag-dialog class="bin-script-dialog" :title="title" append-to-body width="900px" :visible.sync="visible">
    <div v-if="visible" class="content-warp">
      <div class="left-area">
        <div class="top-title">
          响应动作
        </div>
        <div class="box-area">
          <div class="a-menu-box">
            <div v-for="item in aMenu" :key="item.label" :class="item.value === currentA.value ? 'current' : ''" class="item" @click="handleAMenuClick(item)">
              <span>{{ item.label }}</span> <i v-if="item.label === currentA.label" class="el-icon-check ml-10" />
            </div>
          </div>
          <div class="b-menu-box">
            <div v-for="(item, index) in bMenu" :key="index" :class="item.value === currentB.value ? 'current' : ''" class="item" @click="handleBMenuClick(item)">
              <span>{{ item.label }}</span> <i v-if="item.value === currentB.value" class="el-icon-check ml-10" />
            </div>
          </div>
        </div>
      </div>
      <div class="right-area">
        <div class="top-title">
          参数设置
        </div>
        <div class="box-area">
          <template v-if="currentB.value === 'openUrl' && !isCustomMethod">
            <div class="item">
              <div class="subtitle">网站地址</div>
              <div class="sub-content">
                <el-input v-model="openForm.url" placeholder="请输入跳转地址" type="text" size="mini" />
              </div>
            </div>
            <div class="item">
              <div class="subtitle">打开目标</div>
              <div class="sub-content">
                <el-select v-model="openForm.target" class="w-100" placeholder="请选择打开方式" size="mini" value="">
                  <el-option v-for="item in targetOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>
          </template>
          <template v-else-if="currentB.value === 'showComponent' && !isCustomMethod">
            <div class="item">
              <div class="subtitle">目标组件</div>
              <div class="sub-content">
                <el-select v-model="visibleForm.component" class="w-100" placeholder="请选择目标组件" size="mini" value="">
                  <el-option v-for="item in componentOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>
          </template>
          <template v-else-if="currentB.value === 'hideComponent' && !isCustomMethod">
            <div class="item">
              <div class="subtitle">目标组件</div>
              <div class="sub-content">
                <el-select v-model="visibleForm.component" class="w-100" placeholder="请选择目标组件" size="mini" value="">
                  <el-option v-for="item in componentOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>
          </template>
          <template v-else-if="isCustomMethod">
            <vue-editor v-model="methodCode" class="editor-box" readonly height="400px" :options="{ readOnly: true }" theme="vs-light" language="javascript" />
          </template>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
      <el-button size="small" @click="handleCancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'loadsh'
import { mapGetters, mapMutations } from 'vuex'
import { generateOpenUrlFunc } from '../utils/event'
import vueEditor from 'vue-monaco'
export default {
  components: {
    vueEditor
  },
  props: {
    title: {
      type: String,
      default: '绑定事件'
    }
  },
  data() {
    return {
      visible: false,
      currentA: '',
      currentB: '',
      methodCode: '',
      openForm: {
        url: '',
        target: ''
      },
      visibleForm: {
        component: ''
      },
      aMenu: [
        {
          label: '内置动作',
          value: 'systemMethods'
        },
        {
          label: '全局函数',
          value: 'globalMethods'
        }
      ],
      bMenu: [],
      systemFunList: [
        {
          label: '打开URL',
          value: 'openUrl',
          type: 'system'
        },
        {
          label: '显示组件',
          value: 'showComponent',
          type: 'system'
        },
        {
          label: '隐藏组件',
          value: 'hideComponent',
          type: 'system'
        }
      ],
      globalFunList: [],
      targetOptions: [
        {
          label: '新窗口打开',
          value: '_blank'
        },
        {
          label: '当前页面打开',
          value: '_self'
        }
      ],
      componentOptions: [],
      isCustomMethod: false
    }
  },
  computed: {
    ...mapGetters(['methodsList', 'currentFormItem']),
    newMethodsList() {
      return this.methodsList.map(item => {
        return {
          label: item.funcName,
          value: item.funcBody,
          type: 'function'
        }
      })
    }
  },
  created() {
  },
  methods: {
    ...mapMutations({
      addEventToFormItem: 'ADD_EVENT_TO_FORM_ITEM'
    }),
    handleAMenuClick(item) {
      this.currentA = { ...item }
      if (item.value === 'systemMethods') this.bMenu = _.cloneDeep(this.systemFunList)
      else if (item.value === 'globalMethods') this.bMenu = _.cloneDeep(this.newMethodsList)
    },
    handleBMenuClick(item) {
      this.currentB = { ...item }
      this.isCustomMethod = item.type === 'function'
      this.methodCode = this.currentB.value.toString()
    },
    init() {
      this.visible = true
      this.currentB = ''
      this.currentA = ''
      this.methodCode = ''
      this.isCustomMethod = false
    },
    bindMethodToFormItem() {
      const isRepeat = this.currentFormItem.field.events.some(item => item.trigger === this.title)
      const that = this
      const event = {
        current: this.currentFormItem,
        eventName: this.currentB.label,
        funcBody: this.currentB.value,
        prefix: '组',
        trigger: this.title
      }
      if (isRepeat) {
        that.$confirm(`发现重复事件，是否将本方法绑定至原有${this.title}事件?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.visible = false
          that.addEventToFormItem(event)
        }).catch(() => {})
      } else {
        this.addEventToFormItem(event)
        this.handleCancel()
      }
    },
    bindSystemMethodToFormItem() {
      const current = this.currentB
      const openForm = this.openForm
      const eventName = this.currentB.value
      let event
      if (current.value === 'openUrl') {
        event = {
          current: this.currentFormItem,
          eventName: eventName,
          funcBody: generateOpenUrlFunc(eventName, openForm.url, openForm.target),
          prefix: '组',
          trigger: this.title
        }
      }
      this.addEventToFormItem(event)
      this.handleCancel()
    },
    handleSubmit() {
      if (this.isCustomMethod) {
        this.bindMethodToFormItem()
      } else {
        this.bindSystemMethodToFormItem()
      }
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
  .bin-script-dialog {
    .el-dialog__body {
      padding-bottom: 0;
    }
    .el-dialog__header {
      border-bottom: 0;
    }
    .el-dialog__footer {
      .dialog-footer {
        border: none;
        justify-content: flex-end;
        padding: 0 15px;
      }
    }
    .content-warp {
      display: flex;
      .top-title {
        font-size: 14px;
        padding-left: 15px;
        border-left: 2px solid $skyBlue;
      }
      .left-area {
        .box-area {
          width: 270px;
          height: 400px;
          border: 1px solid $border;
          border-radius: 2px;
          margin-top: 15px;
          display: flex;
          .a-menu-box {
            width: 110px;
            border-right: 1px solid $border;
            .item {
              height: 32px;
              line-height: 32px;
              padding: 0 15px;
              font-size: 12px;
              cursor: pointer;
              &.current {
                background-color: $light-blue;
                color: $skyBlue;
              }
            }
          }
          .b-menu-box {
            width: 160px;
            .item {
              height: 32px;
              line-height: 32px;
              padding: 0 15px;
              font-size: 12px;
              cursor: pointer;
              &.current {
                background-color: $light-blue;
                color: $skyBlue;
              }
            }
          }
        }
      }
      .right-area {
        padding-left: 15px;
        width: 100%;
        .box-area {
          margin-top: 15px;
          .editor-box {
            height: 400px;
            border-radius: 2px;
            border: 1px solid $border;
          }
          .item {
            .subtitle {
              font-size: 12px;
              padding: 0 15px;
              background-color: $lightBackground;
              height: 28px;
              line-height: 28px;
              border: 1px solid $border;
              border-radius: 2px;
            }
            .sub-content {
              padding: 10px 0;
            }
          }
        }
      }
    }
  }
</style>
