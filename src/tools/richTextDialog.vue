<template>
  <el-dialog v-el-drag-dialog class="rich-text-dialog" title="富文本内容" append-to-body :visible.sync="dialogVisible" width="800px">
    <ck-editor v-if="dialogVisible" v-model="current.field.value" :editor="editor" :config="editorConfig" />
  </el-dialog>
</template>

<script>
import ckEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { mapGetters } from 'vuex'
export default {
  components: {
    ckEditor: ckEditor.component
  },
  data() {
    return {
      dialogVisible: false,
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
      }
    }
  },
  computed: {
    ...mapGetters(['designForm', 'currentFormItem']),
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
    init() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
  .rich-text-dialog {
    .el-dialog__header {
      border-bottom: 0;
    }
  }
</style>
