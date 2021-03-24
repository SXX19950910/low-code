<template>
  <el-form class="event-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <div class="content-box">
      <el-form-item label="添加事件">
        <div class="split-box">
          <el-select v-model="component" class="spe-select" placeholder="组件自带事件" @change="onComponentChange">
            <el-option v-for="item in current.field.eventOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
          </el-select>
          <el-select v-model="component" class="spe-select" placeholder="原生事件" @change="onComponentChange">
            <el-option-group
                v-for="group in nativeEvents"
                :key="group.label"
                :label="group.label">
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-option-group>
          </el-select >
        </div>
      </el-form-item>
      <el-form-item class="mt-10" label="绑定方法">
        <el-select v-model="bindEvent" class="spe-select w-100 border" placeholder="触发事件"  @change="onBindEventChange">
          <el-option v-for="item in current.field.eventOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <div class="event-area">
        <div class="header-box">
          <div class="left-name">已有事件</div>
          <div class="right-handle">操作</div>
        </div>
        <div class="body-box">
          <div v-if="current.field.events.length === 0" class="place-tip-box">请添加事件</div>
          <div v-for="(item, index) in current.field.events" :key="index" class="item" @click="handleShowEvent(item.trigger)">
            <div class="left-name">
              <span class="prefix">{{ item.prefix }}</span> {{ item.trigger }} ：<span class="info-color">{{ item.eventName }}</span>
            </div>
            <div class="right-handle">
              <el-popconfirm
                  title="确定删除该事件？"
                  @confirm="onConfirmEvent(item)"
              >
                <i class="el-icon-delete info-color" slot="reference"  @click.stop></i>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </div>
    </div>
    <event-drawer ref="drawer" :event-key="eventKey" />
    <bin-script-dialog ref="bind" :title="bindDialogTitle" />
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import eventDrawer from '@/tools/eventDrawer'
import binScriptDialog from '@/tools/binScriptDialog'
export default {
  components: {
    eventDrawer,
    binScriptDialog
  },
  data() {
    return {
      component: '',
      native: '',
      eventKey: '',
      bindDialogTitle: '',
      bindEvent: '',
      nativeEvents: [
        {
          label: '常用事件',
          options: [
            {
              label: 'onClick',
              value: 'onClick'
            },
            {
              label: 'onInput',
              value: 'onInput'
            },
            {
              label: 'onSelect',
              value: 'onSelect'
            },
            {
              label: 'onReset',
              value: 'onReset'
            },
            {
              label: 'onFocus',
              value: 'onFocus'
            },
            {
              label: 'onBlur',
              value: 'onBlur'
            },
            {
              label: 'onScroll',
              value: 'onScroll'
            },
            {
              label: 'onLoad',
              value: 'onLoad'
            },
            {
              label: 'onError',
              value: 'onError'
            }
          ]
        },
        {
          label: '键盘事件',
          options: [
            {
              label: 'onKeyDown',
              value: 'onKeyDown'
            },
            {
              label: 'onKeyPress',
              value: 'onKeyPress'
            },
            {
              label: 'onKeyUp',
              value: 'onKeyUp'
            }
          ]
        },
        {
          label: '鼠标事件',
          options: [
            {
              label: 'onDoubleClick',
              value: 'onDoubleClick'
            },
            {
              label: 'onDrag',
              value: 'onDrag'
            },
            {
              label: 'onDragEnd',
              value: 'onDragEnd'
            },
            {
              label: 'onDragEnter',
              value: 'onDragEnter'
            },
            {
              label: 'onDragExit',
              value: 'onDragExit'
            },
            {
              label: 'onDragLeave',
              value: 'onDragLeave'
            },
            {
              label: 'onDragOver',
              value: 'onDragOver'
            },
            {
              label: 'onDragStart',
              value: 'onDragStart'
            },
            {
              label: 'onDrop',
              value: 'onDrop'
            },
            {
              label: 'onMouseDown',
              value: 'onMouseDown'
            },
            {
              label: 'onMouseEnter',
              value: 'onMouseEnter'
            },
            {
              label: 'onMouseLeave',
              value: 'onMouseLeave'
            },
            {
              label: 'onMouseMove',
              value: 'onMouseMove'
            },
            {
              label: 'onMouseOut',
              value: 'onMouseOUt'
            },
            {
              label: 'onMouseOver',
              value: 'onMouseOver'
            },
            {
              label: 'onMouseUp',
              value: 'onMouseUp'
            }
          ]
        },
        {
          label: '动画事件',
          options: [
            {
              label: 'onAnimationStart',
              value: 'onAnimationStart'
            },
            {
              label: 'onAnimationEnd',
              value: 'onAnimationEnd'
            },
            {
              label: 'onAnimationIteration',
              value: 'onAnimationIteration'
            },
            {
              label: 'onTransitionEnd',
              value: 'onTransitionEnd'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['designForm', 'currentFormItem'])
  },
  methods: {
    ...mapMutations({
      addEventToFormItem: 'ADD_EVENT_TO_FORM_ITEM'
    }),
    onBindEventChange(value) {
      this.bindDialogTitle = value
      this.$refs.bind.init()
      this.bindEvent = ''
    },
    onComponentChange(value) {
      this.component = ''
      this.eventKey = value
      const isFind = this.current.field.eventOptions.some(item => item.label === value)
      const obj = {
        current: this.currentFormItem,
        eventName: value,
        prefix: isFind ? '组' : '原',
        trigger: value
      }
      this.addEventToFormItem(obj)
      this.$refs.drawer.init()
    },
    onConfirmEvent(item) {
      this.$refs.drawer.handleDeleteEvent(item.eventName)
    },
    handleShowEvent(value) {
      this.eventKey = value
      this.$refs.drawer.init()
    }
  }
}
</script>

<style lang="scss">
.event-options-warp {
  .title-top {
    padding: 15px;
    background-color: $lightBackground;
    font-size: 14px;
    color: $info;
    border-bottom: 1px solid $border;
  }
  .spe-select {
    background-color: #fff;
    .el-select__caret {
      display: none;
    }
    .el-input__inner {
      background-color: #fff;
      text-align: center;
      color: $mainFontColor;
      border: none;
      border-radius: 0;
      padding: 0;
      &::placeholder {
        color: $generalFontColor;
      }
    }
    &:first-child {
      border-right: 1px solid $border;
    }
  }
  .content-box {
    padding: 15px;
    .split-box {
      display: flex;
      align-items: center;
      width: 100%;
      border: 1px solid $border;
    }
    .event-area {
      border: 1px solid $border;
      overflow: hidden;
      .header-box {
        display: flex;
        align-items: center;
        height: 40px;
        background-color: $lightBackground;
        font-size: 12px;
        color: $generalFontColor;
        border-bottom: 1px solid $border;
        .left-name {
          width: 80%;
          padding-left: 15px;
          border-right: 1px solid $border;
          height: 100%;
          line-height: 40px;
          white-space: nowrap;
          .info-color {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .prefix {
            flex-shrink: 0;
          }
        }
        .right-handle {
          padding-left: 15px;
        }
      }
      .body-box {
        min-height: 40px;
        position: relative;
        .place-tip-box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          color: $info;
        }
        .item {
          @extend .header-box;
          background-color: white;
          cursor: pointer;
          transition: .3s background-color ease;
          &:hover {
            background-color: $light-blue;
            color: $skyBlue;
          }
          &:last-child {
            border-bottom: 0;
          }
          .left-name {
            display: flex;
            align-items: center;
            width: 80%;
            .prefix {
              border-radius: 100%;
              background-color: $skyBlue;
              color: white;
              text-align: center;
              width: 20px;
              height: 20px;
              line-height: 20px;
              margin-right: 5px;
            }
          }
          .right-handle {
            font-size: 16px;
            i {
              @include hover-color($info, $skyBlue);
            }
          }
        }
      }
    }
  }
}
</style>
