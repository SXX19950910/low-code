<template>
  <el-form className="input-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="显示名称">
          <el-input v-model="current.field.name" size="small" type="text"/>
        </el-form-item>
        <el-form-item label="字段Prop">
          <el-input v-model="current.field.paramsKey" size="small" />
        </el-form-item>
        <el-form-item label="元素Class">
          <el-input v-model="current.elementId" size="small" disabled/>
        </el-form-item>
        <el-form-item label="字段class">
          <el-input v-model="current.field.props.className" size="small"/>
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
export default {
  props: {
  },
  data() {
    return {
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
