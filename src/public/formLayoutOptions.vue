<template>
  <el-form class="form-layout-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="表单class">
          <el-input v-model="current.field.props.className" />
        </el-form-item>
        <el-form-item label="label对齐方式">
          <el-select v-model="current.field.props.labelPosition" class="w-100">
            <el-option v-for="item in labelOptions" :key="item.label" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="label宽度">
          <el-input v-model="current.field.props.labelWidth" class="w-100" />
        </el-form-item>
        <el-form-item label="表单尺寸">
          <el-radio-group v-model="current.field.props.size" size="small">
            <el-radio-button v-for="item in sizeOptions" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="反馈图标">
          <el-switch v-model="current.field.props.statusIcon" />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="高级">
        <el-form-item class="mb-0" label="CSS样式">
          <el-link type="primary" icon="el-icon-edit" @click.native="handleShowCssDialog">
            修改
          </el-link>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <css-dialog ref="css" />
  </el-form>
</template>

<script>
  import cssDialog from '../tools/cssDialog'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      cssDialog
    },
    data() {
      return {
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
        labelOptions: [
          {
            label: '上对齐',
            value: 'top'
          },
          {
            label: '左对齐',
            value: 'left'
          },
          {
            label: '右对齐',
            value: 'right'
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['currentFormItem', 'designForm']),
      form() {
        return this.$store.state.form.options
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
      handleShowCssDialog() {
        this.$refs.css.init()
      }
    }
  }
</script>

<style lang="scss">
  .form-layout-options-warp {
    .label-width-ipt {
      .el-input__inner {
        text-align: center;
      }
    }
  }
</style>
