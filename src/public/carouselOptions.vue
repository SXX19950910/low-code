<template>
  <el-form class="button-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="显示名称">
          <el-input v-model="current.field.name" />
        </el-form-item>
        <el-form-item label="字段Prop">
          <el-input v-model="current.field.paramsKey" />
        </el-form-item>
        <el-form-item label="元素Class">
          <el-input v-model="current.elementId" disabled />
        </el-form-item>
        <el-form-item label="字段Class">
          <el-input v-model="current.field.props.className" />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="常用">
        <div class="handle-table">
          <div class="header-top">
            <div class="name">功能名称</div>
            <div class="handle">操作</div>
          </div>
          <div class="body-sub">
            <div class="item">
              <div class="name">自动切换</div>
              <el-checkbox v-model="current.field.props.autoplay" />
            </div>
            <div class="item">
              <div class="name">循环</div>
              <el-checkbox v-model="current.field.props.loop" />
            </div>
            <div class="item">
              <div class="name">显示字段</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="高级">
        <el-form-item label="高度">
          <el-input v-model="current.field.props.height" type="text" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="current.field.props.type" class="w-100" size="small">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="自动切换时间间隔">
          <el-input-number class="w-100" v-model="current.field.props.interval" />
        </el-form-item>
        <el-form-item label="轮播图方向">
          <el-select v-model="current.field.props.direction" class="w-100" size="small">
            <el-option v-for="item in directionOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="指示器的位置">
          <el-select v-model="current.field.props.indicatorPosition	" class="w-100" size="small">
            <el-option v-for="item in positionOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
    },
    data() {
      return {
        isEditOption: false,
        optionLabel: '',
        optionValue: '',
        sizeOptions: [
          {
            label: '大',
            value: 'medium'
          },
          {
            label: '中',
            value: 'small'
          },
          {
            label: '小',
            value: 'mini'
          }
        ],
        directionOptions: [
          {
            label: '横向',
            value: 'horizontal'
          },
          {
            label: '竖向',
            value: 'vertical'
          }
        ],
        positionOptions: [
          {
            label: '外部',
            value: 'outside'
          },
          {
            label: '内部',
            value: ''
          },
          {
            label: '隐藏',
            value: 'none'
          }
        ],
        typeOptions: [
          {
            label: '默认',
            value: 'none'
          },
          {
            label: '卡片',
            value: 'card'
          },
        ],
        originOptions: [
          {
            label: '前端',
            value: '0'
          },
          {
            label: '后端',
            value: '1'
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['designForm', 'currentFormItem']),
      dragOptions() {
        return {
          animation: 200
        }
      },
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
        addFormItemOption: 'ADD_FORM_ITEM_OPTION',
        deleteFormItemOption: 'DELETE_FORM_ITEM_OPTION',
        getFormItemRule: 'SET_FORM_ITEM_RULE'
      }),
      handleShowEditOption() {
        this.isEditOption = true
      },
      handleAddOption() {
        const item = {
          label: this.optionLabel,
          value: this.optionValue
        }
        this.addFormItemOption(item, this.currentFormItem)
        this.isEditOption = false
        this.optionLabel = ''
        this.optionValue = ''
      },
      handleHideEditOption() {
        this.isEditOption = false
      },
      handleDeleteOption(data) {
        this.deleteFormItemOption(data)
      }
    }
  }
</script>

<style lang="scss"></style>
