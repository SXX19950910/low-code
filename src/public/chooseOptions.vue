<template>
  <el-form class="choose-options-warp" label-position="top">
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
        <el-form-item v-if="current.field.props.moreVisible" label="基础数据条目">
          <el-input-number v-model="current.field.props.moreSliceNumber" class="w-100" />
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
              <div class="name">浅色模式</div>
              <el-checkbox v-model="current.field.props.plain" />
            </div>
            <div class="item">
              <div class="name">更多按钮</div>
              <el-checkbox v-model="current.field.props.moreVisible" />
            </div>
            <div class="item">
              <div class="name">显示字段</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="校验">
        <el-form-item label="校验规则">
          <el-select v-model="current.field.ruleName" class="w-100" filterable clearable @change="getFormItemRule">
            <el-option v-for="(item, index) in $store.state.form.rules" :key="index" :label="item.desc" :value="item.attrName" />
          </el-select>
          <div class="rule-detail-area">
            <div class="rule-item mb-0">
              <span class="label">必填 <el-checkbox v-model="current.field.rule.required" true-label="1" false-label="0" class="value ml-15" /></span>
              <el-input v-model="current.field.rule.requiredMsg" class="w-100" />
            </div>
            <div class="rule-item">
              <span class="label mr-15">最小长度</span>
              <el-input-number v-model="current.field.rule.minLimit" class="w-100" />
            </div>
            <div class="rule-item">
              <span class="label mr-15">最小长度提示</span>
              <el-input v-model="current.field.rule.minLimitMsg" class="w-100" />
            </div>
            <div class="rule-item">
              <span class="label mr-15">最大长度</span>
              <el-input-number v-model="current.field.rule.maxLimit" class="w-100" />
            </div>
            <div class="rule-item">
              <span class="label mr-15">最大长度提示</span>
              <el-input v-model="current.field.rule.maxLimitMsg" class="w-100" />
            </div>
            <div class="rule-item">
              <span class="label mr-15">自定义规则</span>
              <el-input v-model="current.field.rule.regular" class="w-100" />
            </div>
            <div class="rule-item">
              <span class="label mr-15">自定义规则提示</span>
              <el-input v-model="current.field.rule.regularMsg" class="w-100" />
            </div>
          </div>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import request from '@/ylCommon/utils/request'
export default {
  name: 'ChooseOptions',
  components: {
  },
  data() {
    return {
      isEditOption: false,
      optionLabel: '',
      optionValue: '',
      options: [],
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
      getFormItemRule: 'SET_FORM_ITEM_RULE',
      setFormItemOption: 'SET_FORM_ITEM_OPTION'
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
    },
    async onApiChange() {
      const isApi = this.current.field.api.includes('.do')
      const params = JSON.parse(this.current.field.params)
      if (isApi && params) {
        const res = await request({ url: this.current.field.api, data: params })
        if (res.data && res.data.length > 0) {
          const data = res.data.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
          this.setFormItemOption({ id: this.current.field.elementId, data })
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .choose-options-warp {
  }
</style>
