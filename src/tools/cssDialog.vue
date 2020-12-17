<template>
  <el-dialog class="css-dialog-warp" append-to-body title="CSS样式" width="800px" :visible.sync="dialogVisible" @opened="onOpened" @closed="onClosed">
    <el-tabs type="border-card">
      <el-tab-pane label="页面CSS">
        <code-editor v-if="showEditor" v-model="$store.state.form.page.css" class="monaco-box" theme="vs-dark" language="scss" @change="onCssChange" />
      </el-tab-pane>
    </el-tabs>
    <div />
  </el-dialog>
</template>

<script>
import codeEditor from 'vue-monaco'
import { mapGetters } from 'vuex'
import { debounce } from 'throttle-debounce'
export default {
  components: {
    codeEditor
  },
  data() {
    return {
      dialogVisible: false,
      showEditor: false,
      css: '',
      debounceChange: Function
    }
  },
  computed: {
    ...mapGetters(['pageCss'])
  },
  mounted() {
    this.debounceChange = debounce(500, this.onCssChange)
  },
  methods: {
    onOpened() {
      this.$nextTick(() => {
        this.showEditor = true
      })
    },
    onClosed() {
      this.showEditor = false
    },
    init() {
      this.dialogVisible = true
    },
    onCssChange(value) {
      let styleTag = document.getElementById('yl-form-style')
      styleTag && styleTag.remove()
      styleTag = document.createElement('style')
      styleTag.setAttribute('type', 'text/css')
      styleTag.setAttribute('id', 'yl-form-style')
      styleTag.innerText = value
      document.head.appendChild(styleTag)
    }
  }
}
</script>

<style lang="scss">
  .css-dialog-warp {
    .el-dialog__header {
      border: none;
      background-color: #1e1e1e;
      display: none;
    }
    .el-dialog__body {
      padding: 0;
      .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        background-color: #1E1E1E;
        border-color: #1E1E1E;
        color: white;
      }
      .el-tabs {
        border: none;
        box-shadow: none;
        .el-tabs__nav-wrap {
          background: #1E1E1E;
        }
        .el-tabs__content {
          padding: 0;
          .monaco-box {
            background-color: #1e1e1e;
            height: 600px;
            padding: 10px 0;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
