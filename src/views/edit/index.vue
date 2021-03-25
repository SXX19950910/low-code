<template>
  <div id="low-code-warp" ref="design">
    <div class="left-edge-bar">
      <div class="top-area">
        <div class="item" title="全局函数" @click="handleShowJsPanel">
          <i class="iconfont iconjs" />
        </div>
        <div class="item" title="源码开发" @click="handleShowCodeDialog">
          <i class="iconfont icon2daimashengcheng" />
        </div>
        <div class="item" title="数据源" @click="handleShowDataSource">
          <i class="iconfont icon9zidingyishuju" />
        </div>
      </div>
    </div>
    <div class="left-component-warp">
      <el-tabs v-model="tab" class="design-tabs" type="border-card">
        <el-tab-pane name="original" label="组件库">
          <div class="search-area">
            <el-input prefix-icon="el-icon-search" type="text" placeholder="请搜索你想要得组件" size="mini" />
          </div>
          <div class="component-view-area">
            <el-scrollbar class="left-scroll-area">
              <div v-for="item in originalList" :key="item.title" class="classify-box">
                <div class="sub-title">{{ item.title }}</div>
                <div v-for="tag in item.components" :key="tag.id" :class="tag.id === currentId ? 'current' : ''" class="item none-item" :field-id="tag.id" @click="handleComponentClick(tag)">
                  <span class="name" :title="tag.name">{{ tag.name }}</span>
                  <i class="el-icon-caret-left" />
                </div>
              </div>
            </el-scrollbar>
            <el-scrollbar ref="rightScroll" class="right-scroll-area">
              <div v-for="item in originalList" :key="item.title" class="classify-box">
                <div class="sub-title">{{ item.title }}</div>
                <draggable v-bind="leftDragOptions" @start="onStart">
                  <div v-for="tag in item.components" :id="tag.id" :key="tag.id" class="item none-item" :field-id="tag.id">
                    <div class="top-left-title">{{ tag.name }} {{ tag.type }}</div>
                    <div class="wrapper-item">
                      <i :class="tag.icon" />
                      <span class="name" :title="tag.name">
                        {{ tag.name }}
                      </span>
                    </div>
                  </div>
                </draggable>
              </div>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane name="options" label="组件树">
          <el-scrollbar class="field-list">
            <field-tree />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="middle-form-warp">
      <div class="top-fun-area">
        <div class="left-handle">
          <el-link type="primary" icon="el-icon-upload2" size="mini" @click="handleSubmit">保存</el-link>
          <el-link v-if="isEdit" class="ml-15" type="primary" icon="el-icon-edit" size="mini" @click="handleShowEditKey">修改Key</el-link>
        </div>
        <div class="right-handle">
          <el-link class="mr-15" @click="handleClear"><i class="iconfont icon1clear mr-5" />清空</el-link>
          <el-link class="mr-15" @click="handlePreview"><i class="iconfont icon37yulan mr-5" />预览</el-link>
        </div>
      </div>
      <div v-if="placeVisible" class="fq-tip">
        <img src="@/assets/images/design.png" alt="png">
        <p>请将左侧组件拖入此处</p>
      </div>
      <draggable v-model="$store.state.lowCode.form" tag="div" class="middle-form-content" :style="warpStyles" :class="boardClass" group="component" handle=".move-bar" :animation="0" @add="onFieldAdd" @click.native.stop="handleSelectPage">
        <drag-component v-for="(component) in $store.state.lowCode.form" :ref="component.elementId" :key="component.elementId" :element-id="component.elementId" :field="component" :active="component.active" @delete="onDelete" />
      </draggable>
    </div>
    <div class="right-options-warp">
      <el-tabs v-model="options" class="design-tabs right-tab" type="border-card">
        <template v-if="isPage">
          <el-tab-pane name="props" label="属性">
            <el-scrollbar class="options-area">
              <page-options />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane name="styles" label="样式">
            <el-scrollbar class="options-area">
              <page-style />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane name="events" label="事件" />
        </template>
        <template v-else>
          <el-tab-pane name="props" label="属性">
            <el-scrollbar class="options-area">
              <div v-if="!currentFormItem.type" class="no-data-box">
                <i class="iconfont iconzanwushuju" />
                <p>请先选择组件</p>
              </div>
              <component :is="currentOptions" v-if="currentFormItem.type" :ref="currentFormItem.type" />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane name="styles" label="样式">
            <el-scrollbar class="style-scroll-area">
              <div v-if="!currentFormItem.type" class="no-data-box">
                <i class="iconfont iconzanwushuju" />
                <p>请先选择组件</p>
              </div>
              <style-options v-else />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane name="events" label="事件">
            <el-scrollbar class="style-scroll-area">
              <div v-if="!currentFormItem.type" class="no-data-box">
                <i class="iconfont iconzanwushuju" />
                <p>请先选择组件</p>
              </div>
              <event-options v-else />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane name="form" label="数据">
            <el-scrollbar class="style-scroll-area">
              <div v-if="!currentFormItem.type" class="no-data-box">
                <i class="iconfont iconzanwushuju" />
                <p>请先选择组件</p>
              </div>
              <data-options v-else />
            </el-scrollbar>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <code-dialog ref="code" />
    <script-panel ref="script" />
    <data-source ref="data" />
  </div>
</template>

<script>
import designPng from '@/assets/images/design.png'
import draggable from 'vuedraggable'
import { formatFormItem, removeAllNonItem, generateId } from '@/utils/global'
import { parseStyles } from '@/utils/style'
import { mapGetters, mapMutations } from 'vuex'
import codeDialog from '@/tools/codeDialog'
import fieldTree from '@/tools/fieldTree'
import scriptPanel from '@/tools/scriptPanel'
import dataSource from '@/tools/dataSource'
import _ from 'loadsh'
export default {
  components: {
    draggable,
    codeDialog,
    fieldTree,
    scriptPanel,
    dataSource
  },
  data() {
    return {
      isEdit: false,
      tab: 'original',
      options: 'props',
      componentList: [],
      originalList: [],
      drawerVisible: true,
      currentId: '',
      formKey: '',
      downField: {},
      placeholderPic: designPng,
      leftCollapse: ['基础组件', '高级组件', '布局组件']
    }
  },
  computed: {
    ...mapGetters(['collection', 'designForm', 'currentFormItem', 'formOptions', 'pageStyles', 'pageProps', 'pageCss']),
    warpStyles() {
      return parseStyles(this.pageStyles, this.pageProps)
    },
    placeVisible() {
      return (this.$store.state.lowCode.form && this.$store.state.lowCode.form.length < 1) && (!this.pageStyles.backgroundImage && !this.pageStyles.backgroundColor)
    },
    leftDragOptions() {
      return {
        group: {
          name: 'component',
          pull: 'clone',
          put: false
        },
        animation: 200,
        chosenClass: 'sortable-chosen',
        sort: false
      }
    },
    boardClass() {
      const className = []
      if (Object.keys(this.downField).length > 0) className.push(`${this.downField.type}-board`)
      if (this.currentFormItem.elementId === 'page') className.push('current')
      return className
    },
    middleDragOptions() {
      return {
        group: {
          name: 'component'
        },
        handle: '.move-bar',
        animation: 0
      }
    },
    isPage() {
      return this.currentFormItem.type === 'page'
    },
    currentOptions() {
      return this.currentFormItem.menuName
    },
    formOptions() {
      return this.$store.state.lowCode.options
    }
  },
  created() {
    this.init()
  },
  activated() {
  },
  methods: {
    ...mapMutations({
      clearForm: 'CLEAR_FORM',
      initForm: 'INIT_FORM'
    }),
    onStart(drag) {
      const id = drag.item.getAttribute('field-id')
      this.downField = _.cloneDeep(this.collection.find(item => item.id === id))
    },
    handleComponentClick(field) {
      this.currentId = field.id
      const $field = document.getElementById(field.id)
      this.$refs.rightScroll.$refs.wrap.scrollTop = $field.offsetTop
    },
    handleShowEditKey() {
      this.$prompt('修改关键Key', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.formKey
      }).then(({ value }) => {
        this.formKey = value
        this.handleUpdateForm()
      }).catch(() => {
      })
    },
    formatData() {
      return {
        page: {
          items: this.designForm,
          css: this.pageCss,
          styles: this.pageStyles
        }
      }
    },
    async handleSaveForm() {
      let formKey = ''
      const submit = async() => {
        const params = {
          parameter: {
            formKey,
            formValue: JSON.stringify(this.formatData())
          }
        }
        const res = await this.$Api.form.saveForm(params)
        if (res.success) {
          this.$message.success('保存成功')
          this.clearForm()
          this.$router.push({ name: 'SystemSettingFilter' })
        }
      }
      this.$prompt('请输入表单名称-（组件调用关键Key）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (!value) this.$message.error('表单名称为必填项！')
        else {
          formKey = value
          submit()
        }
      }).catch(() => {
      })
    },
    async handleUpdateForm() {
      console.log(this.formatData())
      const params = {
        parameter: {
          id: this.$route.query.key,
          formKey: this.formKey,
          formValue: JSON.stringify(this.formatData())
        }
      }
      const res = await this.$Api.form.updateForm(params)
      if (res.success) {
        this.$message.success('保存成功')
      }
    },
    handleSubmit() {
      if (this.isEdit) this.handleUpdateForm()
      else this.handleSaveForm()
    },
    handleShowCodeDialog() {
      this.$refs.code.init()
    },
    handleShowDataSource() {
      this.$refs.data.init()
    },
    handlePreview() {
      const previewKey = generateId()
      const router = this.$router.resolve({ path: '/preview', query: { previewKey }})
      const previewCache = sessionStorage.getItem('preview') ? JSON.parse(sessionStorage.getItem('preview')) : {}
      previewCache[previewKey] = this.formatData()
      sessionStorage.setItem('preview', JSON.stringify(previewCache))
      window.open(router.href, '_blank')
    },
    handleClear() {
      this.$confirm('此操作将清空表单，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.clearForm()
      }).catch(() => {})
    },
    onFieldAdd(drag) {
      this.downField = {}
      removeAllNonItem()
      const newIndex = drag.newIndex
      const isSort = drag.item.className.includes('form-drag-warp')
      if (isSort) return
      const id = drag.item.getAttribute('field-id')
      const field = _.cloneDeep(this.collection.find(item => item.id === id))
      const newField = formatFormItem(field)
      newField.parentId = null
      newField.index = newIndex
      console.log(newField)
      this.insertComponent(newField)
    },
    handleSelectPage() {
      const page = {
        type: 'page',
        elementId: 'page',
        field: {}
      }
      this.setCurrentComponent(page)
    },
    onDelete({ id }) {
      this.form.map((item, index) => {
        if (item.key === id) {
          this.form.splice(index, 1)
        }
      })
    },
    async init() {
      this.clearForm()
      await this.getLeftComponents()
      await this.getFormItemRules()
      await this.initData()
    },
    async initData() {
      const key = this.$route.query.key
      this.isEdit = typeof key === 'string'
      if (this.isEdit) {
        const params = {
          parameter: {
            id: key
          }
        }
        const res = await this.$Api.form.getForms(params)
        if (res.success) {
          const data = JSON.parse(res.data[0].formValue)
          this.formKey = res.data[0].formKey
          this.initForm(data.page)
        }
      } else {
        this.clearForm()
      }
      this.setCssTag()
    },
    getFormItemRules() {
      this.$store.dispatch('lowCode/getRules')
    },
    setCssTag() {
      let styleTag = document.getElementById('yl-form-style')
      styleTag && styleTag.remove()
      styleTag = document.createElement('style')
      styleTag.setAttribute('type', 'text/css')
      styleTag.setAttribute('id', 'yl-form-style')
      styleTag.innerText = this.pageCss
      document.head.appendChild(styleTag)
    },
    async getLeftComponents() {
      const res = await this.$store.dispatch('lowCode/init')
      this.originalList = res
    },
    handleShowJsPanel() {
      this.$refs.script.init()
    }
  }
}
</script>

<style lang="scss">
@import "./../../styles/var";
@import "./../../styles/mixin";
#low-code-warp {
  display: flex;
  height: 100vh;
  border-bottom: 1px solid $border;
  overflow: auto;
  // 左侧菜单宽328px + 右侧菜单宽300px
  min-width: 100vw;
  width: 100%;
  .left-edge-bar {
    width: 48px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    background-color: #ECF5FF;
    .top-area {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      .item {
        width: 48px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
        .iconfont {
          font-size: 24px;
          @include hover-color($skyBlue, $generalFontColor);
          outline: none;
          border: none;
        }
      }
    }
  }
  .design-tabs {
    height: 100vh;
    box-shadow: none;
    border-top: 0;
    border-bottom: 0;
    .el-tabs__content {
      padding: 0 0 0 0;
      min-height: 100vh;
    }
    .el-tabs__header {
      height: 40px;
    }
    .el-collapse {
      border: 0;
      .el-collapse-item__header {
        padding: 0 15px;
        background-color: $lightBackground;
        height: 40px;
        line-height: 40px;
      }
      .el-collapse-item__content {
        padding: 15px 15px 5px 15px;
      }
      .field-area {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        &:first-child {
        }
        .item {
          font-size: 12px;
          height: 32px;
          border-radius: 2px;
          background-color: $lightBackground;
          margin-bottom: 10px;
          width: 48%;
          text-align: center;
          display: flex;
          align-items: center;
          color: $generalFontColor;
          cursor: pointer;
          user-select: none;
          padding: 0 5px;
          border: 1px solid $border;
          &:hover {
            border: 1px solid $skyBlue;
            background-color: #ECF5FF;
            color: $skyBlue;
          }
          .name {
            @include ellipsis-one;
            text-align: left;
            margin-left: 10px;
          }
          .iconfont {
            font-size: 18px;
          }
        }
      }
    }
  }
  .left-component-warp {
    width: 280px;
    height: 100%;
    flex-shrink: 0;
    border-radius: 2px;
    overflow: hidden;
    .search-area {
      padding: 15px;
      background-color: $lightBackground;
    }
    .component-view-area {
      display: flex;
      background-color: $lightBackground;
      .left-scroll-area {
        height: 100vh;
        border-right: 1px solid $border;
        flex-shrink: 0;
        .el-scrollbar__wrap {
          overflow-x: hidden;
        }
        .classify-box {
          padding: 0 15px;
          margin-top: 15px;
          .sub-title {
            color: $skyBlue;
            font-weight: bold;
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            border-bottom: 1px solid $border;
          }
          .item {
            font-size: 12px;
            color: $generalFontColor;
            height: 26px;
            line-height: 26px;
            @include hover-color($generalFontColor, $skyBlue);
            position: relative;
            &.current {
              color: $skyBlue;
              font-weight: bold;
              .el-icon-caret-left {
                display: block;
              }
            }
            .el-icon-caret-left {
              position: absolute;
              display: none;
              right: -20px;
              top: 5px;
              font-size: 16px;
              color: $skyBlue;
            }
          }
        }
      }
      .right-scroll-area {
        height: calc(100vh - 100px);
        width: 100%;
        .el-scrollbar__wrap {
          overflow-x: hidden;
        }
        .classify-box {
          padding: 0 15px;
          &:first-child {
            padding-top: 15px;
          }
          .sub-title {
            color: $skyBlue;
            font-weight: bold;
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            border-bottom: 1px solid $border;
          }
          .item {
            .top-left-title {
              font-size: 12px;
              color: $info;
              font-weight: bold;
              line-height: 20px;
              @include ellipsis-one;
            }
            .wrapper-item {
              height: 36px;
              line-height: 36px;
              text-align: center;
              border: 1px dashed #b9b9b9;
              color: $generalFontColor;
              font-size: 12px;
              margin-bottom: 10px;
              cursor: move;
            }
          }
        }
      }
    }
    .title-top {
      font-size: 14px;
      color: $mainFontColor;
      margin-bottom: 15px;
      margin-top: 5px;
      border-left: 2px solid $skyBlue;
      padding-left: 10px;
    }
    .field-list {
      height: calc(100vh - 141px);
      .el-scrollbar__wrap {
        overflow-x: hidden;
        padding-right: 15px;
      }
    }
  }
  .middle-form-warp {
    width: 100%;
    min-width: 1280px;
    position: relative;
    .top-fun-area {
      height: 40px;
      width: 100%;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      border-bottom: 1px solid $border;
      .el-link--inner {
        display: flex;
        align-items: center;
      }
    }
    .fq-tip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #D8DEE5;
      font-size: 28px;
      text-align: center;
      z-index: 1;
      p {
        margin: 5px 0;
      }
    }
    .middle-form-content {
      height: calc(100% - 40px);
      padding: 10px 10px 0 10px;
      overflow: auto;
      position: relative;
      border: 1px solid transparent;
      background-color: #FFFFFF;
      &.current {
        border: 1px solid $skyBlue;
      }
      .native-field-warp {
        display: flex;
        align-items: center;
        .field-label {
          flex-shrink: 0;
          font-size: 14px;
          color: $generalFontColor;
          padding-right: 15px;
        }
      }
      .no-field {
        &:before {
          content: "\8BF7\62D6\5165\7EC4\4EF6";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          opacity: 1!important;
          visibility: visible!important;
          line-height: 30px;
          height: 30px;
          font-size: 13px;
          color: #ccc;
          text-align: center;
        }
      }
      .el-table {
        background-color: transparent;
        &:before {
          display: none;
        }
      }
      .item.none-item.sortable-chosen {
        width: 100%;
        height: 1px;
        background-color: $skyBlue;
        display: block;
        * {
          display: none;
        }
      }
      .none-item {
        display: none;
      }
      &.button-board {
        .item.none-item.sortable-chosen {
          width: 1px;
          min-height: 42px;
          background-color: $skyBlue;
          display: inline-block;
          * {
            display: none;
          }
        }
      }
    }
  }
  .right-options-warp {
    width: 300px;
    flex-shrink: 0;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    z-index: 2000;
    .style-scroll-area {
      height: calc(100vh - 40px);
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
    .el-collapse-item {
      .el-collapse-item__content {
        padding-bottom: 15px;
      }
    }
    .no-data-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      .iconfont {
        font-size: 36px;
        color: #999999;
      }
      p {
        color: #999999;
        font-size: 14px;
      }
    }
    .event-area {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      .el-link.is-underline:hover:after {
        display: none;
      }
      .el-link {
        border-top: 1px solid #DCDFE6;
        height: 24px;
        border-left: 1px solid #DCDFE6;
        border-right: 1px solid #DCDFE6;
        border-radius: 2px;
        background-color: $lightBackground;
        &:hover {
          background-color: $light-blue;
          color: $skyBlue;
        }
      }
    }
    .handle-table {
      border: 1px solid $border;
      border-radius: 2px;
      border-bottom: 0;
      .header-top {
        height: 40px;
        background-color: $lightBackground;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        width: 100%;
        color: $generalFontColor;
        padding: 0 10px;
      }
      .body-sub {
        .item {
          height: 40px;
          display: flex;
          align-items: center;
          width: 100%;
          font-size: 14px;
          border-bottom: 1px solid $border;
          justify-content: space-between;
          padding: 0 10px;
          color: $generalFontColor;
        }
      }
    }
    .rule-detail-area {
      .rule-item {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        color: $generalFontColor;
        .label {
          margin-bottom: 10px;
        }
      }
    }
    .options-area {
      height: calc(100vh - 40px);
      .el-scrollbar__wrap {
        overflow-x: hidden;
        .title-top {
          padding: 15px;
          background-color: $lightBackground;
          font-size: 14px;
          color: $info;
          border-bottom: 1px solid $border;
        }
        .sub-title {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 15px;
          .span-text {
            color: $generalFontColor;
            margin-right: 5px;
          }
          .sub-box {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
