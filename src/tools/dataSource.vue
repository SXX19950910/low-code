<template>
  <el-drawer custom-class="data-source-drawer" :show-close="false" append-to-body direction="ltr" :visible.sync="visible" size="400px" :modal="false" title="数据源" @closed="onClosed" @opened="opened">
    <div slot="title" class="header-title">
      数据源
    </div>
    <div class="body-area">
      <el-carousel ref="carousel" :autoplay="false" :loop="false" indicator-position="none" arrow="never">
        <el-carousel-item name="home">
          <el-scrollbar class="scroll-area">
            <div class="search-top">
              <el-select v-model="type" class="type-select" placeholder="类型">
                <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value" />
              </el-select>
              <el-input v-model="searchKey" prefix-icon="el-icon-search" class="search-ipt" placeholder="搜索变量" />
            </div>
            <div class="content-box">
              <div class="handle-con">
                <el-dropdown trigger="click">
                  <el-button size="mini" type="primary">添加</el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleAddVariable">变量</el-dropdown-item>
                    <el-dropdown-item @click.native="handleAddOriginal">数据源</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="data-con">
                <div v-for="(item) in sourceList" :key="item.name" class="item">
                  <div class="display-box">
                    <div class="left-name">
                      <i class="triangle" :class="item.visible ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click="handleShowDescribe(item)" />
                      <span class="success-color mr-10">变量</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <div class="right-btn">
                      <i class="el-icon-edit-outline" title="修改" @click="handleEditVariable(item)" />
                      <i class="el-icon-copy-document" title="复制" />
                      <el-popconfirm
                        title="确定删除？"
                        @confirm="onDeleteItem(item)"
                      >
                        <i slot="reference" class="el-icon-delete" title="删除" />
                      </el-popconfirm>
                    </div>
                  </div>
                  <div v-show="item.visible" class="describe-box">
                    <div class="tag">
                      <span class="label">描述：</span> <span class="value">{{ item.describe }}</span>
                    </div>
                    <div class="tag">
                      <span class="label">初始值：</span> <span class="value">{{ item.data }}</span>
                    </div>
                  </div>
                </div>
                <div v-for="(item) in fetchList" :key="item.name" class="item">
                  <div class="display-box">
                    <div class="left-name">
                      <i class="triangle" :class="item.visible ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click="handleShowDescribe(item)" />
                      <span class="primary-color mr-10">远程</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <div class="right-btn">
                      <i class="el-icon-edit-outline" title="修改" @click="handleEditOriginal(item)" />
                      <i class="el-icon-copy-document" title="复制" />
                      <el-popconfirm
                        title="确定删除？"
                        @confirm="onDeleteItem(item)"
                      >
                        <i slot="reference" class="el-icon-delete" title="删除" />
                      </el-popconfirm>
                    </div>
                  </div>
                  <div v-show="item.visible" class="describe-box">
                    <div class="tag">
                      <span class="label">描述：</span> <span class="value">{{ item.describe }}</span>
                    </div>
                    <div class="tag">
                      <span class="label">初始值：</span> <span class="value">{{ item.data }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </el-carousel-item>
        <el-carousel-item class="submit-carousel" name="variable">
          <el-form ref="variable" :model="variableForm" class="submit-form" label-position="left" label-width="60px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="variableForm.name" size="small" placeholder="名称" />
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input v-model="variableForm.describe" size="small" placeholder="描述" />
            </el-form-item>
            <el-form-item label="数据" prop="data">
              <vue-editor v-if="showEditor" v-model="variableForm.data" class="json-editor" language="json" />
            </el-form-item>
          </el-form>
          <div class="submit-box">
            <el-button type="primary" size="mini" @click="handleSubmitEdit">确定</el-button>
            <el-button size="mini" @click="handleCancelEdit">取消</el-button>
          </div>
        </el-carousel-item>
        <el-carousel-item class="submit-carousel" name="original">
          <el-form ref="original" :model="originalForm" label-width="80px" label-position="left">
            <el-form-item label="名称" prop="name">
              <el-input v-model="originalForm.name" placeholder="名称" />
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input v-model="originalForm.describe" placeholder="描述" />
            </el-form-item>
            <el-form-item label="请求地址" prop="url">
              <el-input v-model="originalForm.url" placeholder="请求地址" />
            </el-form-item>
            <el-form-item label="请求参数" prop="params">
              <el-input v-model="originalForm.params" type="textarea" :rows="4" placeholder="请求地址" />
            </el-form-item>
          </el-form>
          <div class="submit-box">
            <el-button type="primary" size="mini" @click="handleSubmitOriginal">确定</el-button>
            <el-button size="mini" @click="handleCancelEdit">取消</el-button>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-drawer title="添加修改数据源" append-to-body direction="ltr" :modal="false" size="300px" :wrapper-closable="false" custom-class="data-source-edit-drawer" :visible.sync="innerVisible">
      <div slot="title" class="header-title">
        添加数据源
      </div>
    </el-drawer>
  </el-drawer>
</template>

<script>
import vueEditor from 'vue-monaco'
import _ from 'loadsh'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    vueEditor
  },
  data() {
    return {
      visible: false,
      innerVisible: false,
      type: 'variable',
      searchKey: '',
      variableForm: {
        name: '',
        describe: '',
        data: '',
        visible: false,
        type: 'variable'
      },
      isEdit: false,
      originalForm: {
        name: '',
        describe: '',
        url: '',
        params: '',
        visible: false,
        type: 'original'
      },
      options: [
        {
          label: '变量',
          value: 'variable'
        },
        {
          label: '数据源',
          value: 'original'
        }
      ],
      showEditor: false
    }
  },
  computed: {
    ...mapGetters(['sourceList', 'fetchList'])
  },
  methods: {
    ...mapMutations({
      addSourceItem: 'ADD_SOURCE_ITEM',
      addFetchItem: 'ADD_FETCH_ITEM',
      deleteFetchItem: 'DELETE_FETCH_ITEM',
      deleteSourceItem: 'DELETE_SOURCE_ITEM'
    }),
    init() {
      this.visible = true
    },
    openInner() {
      this.innerVisible = true
    },
    handleEditVariable(data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) this.variableForm[key] = data[key]
      }
      this.$refs.carousel.setActiveItem('variable')
    },
    handleEditOriginal(data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) this.originalForm[key] = data[key]
      }
      this.$refs.carousel.setActiveItem('original')
    },
    onDeleteItem(item) {
      if (item.type === 'variable') this.deleteSourceItem(item)
      else if (item.type === 'original') this.deleteFetchItem(item)
    },
    opened() {
      this.$emit('opened')
    },
    onClosed() {
      this.$emit('closed')
    },
    handleShowDescribe(item) {
      item.visible = !item.visible
    },
    handleAddVariable() {
      this.$refs.carousel.setActiveItem('variable')
      this.$nextTick(() => {
        this.showEditor = true
        this.$refs.variable.resetFields()
      })
    },
    handleAddOriginal() {
      this.$refs.carousel.setActiveItem('original')
      this.$nextTick(() => {
        this.$refs.original.resetFields()
      })
    },
    handleCancelEdit() {
      this.$refs.carousel.setActiveItem('home')
    },
    handleSubmitEdit() {
      const data = _.cloneDeep(this.variableForm)
      this.addSourceItem(data)
      this.handleCancelEdit()
    },
    handleSubmitOriginal() {
      const fetch = _.cloneDeep(this.originalForm)
      this.addFetchItem(fetch)
      this.handleCancelEdit()
    }
  }
}
</script>

<style lang="scss">
  @mixin drawer-title {
    .el-drawer__header {
      padding: 0;
      background-color: $lightBackground;
      border-bottom: 1px solid $border;
      margin-bottom: 0;
    }
    .header-title {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      font-size: 14px;
      color: $generalFontColor;
    }
  }
  .data-source-drawer {
    left: 48px !important;
    box-shadow: 3px 0 3px #EFECEC !important;
    border-left: 1px solid $border;
    @include drawer-title;
    z-index: 3000 !important;
    .json-editor {
      height: 400px;
      border: 1px solid $border;
      border-radius: 2px;
    }
    .submit-carousel {
      padding: 15px;
      .submit-box {
        text-align: right;
        border-bottom: 1px solid $border;
        padding-bottom: 15px;
      }
      .submit-form {
        margin-top: 15px;
      }
    }
    .body-area {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .scroll-area {
        height: calc(100vh - 40px);
        background-color: white;
      }
      .el-carousel {
        height: calc(100vh - 40px);
        .el-carousel__container {
          height: 100%;
        }
      }
      .search-top {
        display: flex;
        align-items: center;
        padding: 10px;
        width: 100%;
        justify-content: space-between;
        .type-select {
          width: 35%;
        }
        .search-ipt {
          width: 63%;
        }
      }
      .content-box {
        .handle-con {
          padding: 0 10px;
        }
        .data-con {
          padding: 10px;
          .item {
            margin-bottom: 10px;
            .display-box {
              border: 1px solid $border;
              border-radius: 2px;
              display: flex;
              align-items: center;
              padding: 0 15px;
              height: 32px;
              font-size: 14px;
              justify-content: space-between;
              flex-wrap: wrap;
              .left-name {
                display: flex;
                align-items: center;
                .triangle {
                  color: $generalFontColor;
                  cursor: pointer;
                  font-size: 16px;
                  margin-right: 5px;
                }
                span {
                  font-size: 12px;
                  font-weight: bold;
                  color: $info;
                }
              }
              .right-btn {
                i {
                  margin-left: 5px;
                  color: $generalFontColor;
                  font-size: 16px;
                  cursor: pointer;
                }
              }
              &:hover {
                border-color: $skyBlue;
              }
            }
            .describe-box {
              padding: 15px;
              .tag {
                font-size: 12px;
                margin-bottom: 10px;
                .label {
                  color: $info;
                }
                .value {
                  color: $generalFontColor;
                }
                &:last-of-type {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
