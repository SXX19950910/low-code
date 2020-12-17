<template>
  <el-dialog class="view-dialog-warp" title="预览" fullscreen :visible.sync="dialogVisible">
    <yl-generate-form v-if="dialogVisible" :options-data="$store.state.form.options" :generate-data="$store.state.form.form" />
  </el-dialog>
</template>

<script>
import ylGenerateForm from '@/components/LowCode'
export default {
  components: {
    ylGenerateForm
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    init() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">

</style>
