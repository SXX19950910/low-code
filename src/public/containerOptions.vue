<template>
  <el-form className="input-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="显示名称">
          <el-input v-model="current.field.name" type="text"/>
        </el-form-item>
        <el-form-item label="字段Prop">
          <el-input v-model="current.field.paramsKey"/>
        </el-form-item>
        <el-form-item label="元素Class">
          <el-input v-model="current.elementId" disabled/>
        </el-form-item>
        <el-form-item label="字段class">
          <el-input v-model="current.field.props.className"/>
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
              <div class="name">显示</div>
              <el-checkbox v-model="current.field.visible"/>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="高级">
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    components: {},
    props: {
      field: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        typeOptions: [
          {
            label: '数字',
            value: 'number'
          },
          {
            label: '密码',
            value: 'password'
          },
          {
            label: '文本',
            value: 'text'
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['designForm', 'currentFormItem']),
      current() {
        const {elementId = ''} = this.currentFormItem
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
        getFormItemRule: 'SET_FORM_ITEM_RULE'
      })
    }
  }
</script>

<style lang="scss">

</style>
