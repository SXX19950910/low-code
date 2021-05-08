<template>
  <el-form class="date-picker-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="显示名称">
          <el-input v-model="current.name" size="small" />
        </el-form-item>
        <el-form-item label="字段Prop">
          <el-input v-model="current.field.paramsKey" size="small" />
        </el-form-item>
        <el-form-item label="元素Class">
          <el-input v-model="current.elementId" size="small" disabled />
        </el-form-item>
        <el-form-item label="字段Class">
          <el-input v-model="current.field.props.className" size="small" />
        </el-form-item>
        <el-form-item label="占位内容">
          <el-input v-model="current.field.props.placeholder" size="small"></el-input>
        </el-form-item>
        <el-form-item label="尺寸大小">
          <el-radio-group v-model="current.field.props.size" size="small">
            <el-radio-button v-for="item in sizeOptions" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
          </el-radio-group>
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
              <div class="name">完全只读</div>
              <el-checkbox v-model="current.field.props.readonly" />
            </div>
            <div class="item">
              <div class="name">禁用</div>
              <el-checkbox v-model="current.field.props.disabled" />
            </div>
            <div class="item">
              <div class="name">可输入</div>
              <el-checkbox v-model="current.field.props.editable" />
            </div>
            <div class="item">
              <div class="name">可清除</div>
              <el-checkbox v-model="current.field.props.clearable" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="高级">
        <el-form-item label="对齐方式">
          <el-select class="w-100" v-model="current.field.props.type" size="small">
            <el-option v-for="item in alignOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="下拉框Class">
          <el-input v-model="current.field.props.popperClass" size="small"></el-input>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
export default {
  components: {
  },
  props: {
    field: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      sizeOptions: [
        {
          value: 'medium',
          label: '大'
        },
        {
          value: 'small',
          label: '中'
        },
        {
          value: 'mini',
          label: '小'
        }
      ],
      alignOptions: [
        {
          value: 'left',
          label: '左'
        },
        {
          value: 'center',
          label: '居中'
        },
        {
          value: 'right',
          label: '右'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
