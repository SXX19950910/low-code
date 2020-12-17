<template>
  <el-form class="form-options-warp" label-position="top">
    <el-form-item label="表单class">
      <el-input v-model="form.className" />
    </el-form-item>
    <el-form-item label="label对齐方式">
      <el-select v-model="form.labelPosition" class="w-100">
        <el-option v-for="item in labelOptions" :key="item.label" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="label宽度">
      <el-input v-model="form.labelWidth" class="w-100" />
    </el-form-item>
    <el-form-item label="表单尺寸">
      <el-radio-group v-model="form.size" size="small">
        <el-radio-button v-for="item in sizeOptions" :key="item.label" :label="item.value">{{ item.label }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="反馈图标">
      <el-switch v-model="form.statusIcon" />
    </el-form-item>
    <el-form-item label="CSS样式" @click.native="handleShowCssDialog">
      <el-link type="primary" icon="el-icon-edit">
        修改
      </el-link>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
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
    form() {
      return this.$store.state.form.options
    }
  },
  methods: {
    handleShowCssDialog() {
      this.$emit('show-css')
    }
  }
}
</script>

<style lang="scss">
  .form-options-warp {
    .label-width-ipt {
      .el-input__inner {
        text-align: center;
      }
    }
  }
</style>
