<template>
  <el-form class="page-props-warp" label-position="top">
    <div class="title-top">
      当前选中：page
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="页面Class">
          <el-input />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="高级">
        <el-form-item label="页面样式">
          <el-link type="primary" icon="el-icon-edit" @click="handleShowCss">页面CSS代码</el-link>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <css-dialog ref="css" />
  </el-form>
</template>

<script>
  import cssDialog from '../tools/cssDialog';
  export default {
    components: {
      cssDialog
    },
    data() {
      return {}
    },
    methods: {
      handleShowCss() {
        this.$refs.css.init()
      }
    }
  }
</script>

<style lang="scss">
</style>
