<template>
  <el-form class="button-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="显示名称">
          <el-input v-model="current.field.name" size="small" />
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
        <el-form-item label="类型">
          <el-select v-model="current.field.props.type" class="w-100" size="small">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="尺寸">
          <el-radio-group v-model="current.field.props.size" size="small">
            <el-radio-button v-for="item in sizeOptions" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
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
              <div class="name">浅色模式</div>
              <el-checkbox v-model="current.field.props.plain" size="small" />
            </div>
            <div class="item">
              <div class="name">圆形</div>
              <el-checkbox v-model="current.field.props.circle" size="small" />
            </div>
            <div class="item">
              <div class="name">圆角</div>
              <el-checkbox v-model="current.field.props.round" size="small" />
            </div>
            <div class="item">
              <div class="name">禁用</div>
              <el-checkbox v-model="current.field.props.disabled" size="small" />
            </div>
            <div class="item">
              <div class="name">显示字段</div>
              <el-checkbox v-model="current.field.visible" size="small" />
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
export default {
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
      typeOptions: [
        {
          label: '主要',
          value: 'primary'
        },
        {
          label: '成功',
          value: 'success'
        },
        {
          label: '信息',
          value: 'info'
        },
        {
          label: '警告',
          value: 'warning'
        },
        {
          label: '危险按钮',
          value: 'danger'
        }
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

  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
