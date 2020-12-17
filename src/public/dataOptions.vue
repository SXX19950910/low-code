<template>
  <el-form class="data-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <div class="data-content-area">
      <template v-if="current.type === 'carousel'">
        <el-form-item label="轮播图" class="carousel-area">
          <el-link icon="el-icon-plus" @click="handleShowEditOption">添加轮播图</el-link>
          <el-form v-if="isEditOption" ref="carouselForm" :model="carouselForm" class="add-box mt-10">
            <el-input class="mb-10" placeholder="请输入图片地址" size="mini" v-model="carouselForm.url">
              <template slot="prepend">地址</template>
            </el-input>
            <el-input class="mb-10" placeholder="请输入跳转链接" size="mini" v-model="carouselForm.link">
              <template slot="prepend">链接</template>
            </el-input>
            <el-input placeholder="请输入图片描述" size="mini" v-model="carouselForm.describe">
              <template slot="prepend">描述</template>
            </el-input>
            <el-link type="primary" @click="handleSubmitAddCarouselItem">确定</el-link>
            <el-link class="ml-5" type="info" @click="handleHideEditOption">取消</el-link>
          </el-form>
          <div class="view-box">
            <div v-for="item in current.field.options" :key="item.value" class="item">
              <span class="url ellipsis-one">{{ item.value }}</span>
              <div class="handle">
                <el-popconfirm
                  title="确定该轮播图？"
                  @confirm="handleDeleteOption(item)"
                >
                  <i class="el-icon-close" slot="reference" />
                </el-popconfirm>
              </div>
            </div>
          </div>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="选项配置">
          <el-radio-group v-model="current.field.dataOrigin">
            <el-radio  v-for="item in originOptions" :key="item.index" :label="item.value" :value="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
          <div v-if="current.field.dataOrigin === '0'" class="web-area">
            <div class="options-web-area">
              <div class="sub-title mt-10">
                <span class="span-text info-color">请编辑该字段下所有选型</span>
                <div class="sub-box">
                  <el-link type="primary" @click="handleShowEditOption">
                    <i class="el-icon-circle-plus mr-5" /><span class="fs-14">添加选项</span>
                  </el-link>
                  <div v-if="isEditOption">
                    <el-link class="ml-15" type="primary" size="mini" @click="handleAddOption">确定</el-link>
                    <el-link class="ml-15" type="danger" size="mini" @click="handleHideEditOption">取消</el-link>
                  </div>
                </div>
              </div>
              <div v-if="isEditOption" class="add-box mt-10">
                <el-input v-model="optionLabel" class="w-100 mb-10">
                  <template slot="prepend">选项名</template>
                </el-input>
                <el-input v-model="optionValue" class="w-100">
                  <template slot="prepend">选项值</template>
                </el-input>
              </div>
            </div>
            <div class="list-box">
              <div class="header-col">
                <span class="left-span">显示名称</span>
                <span class="right-span">字段名称</span>
                <span class="handle-span">操作</span>
              </div>
              <draggable v-model="current.field.options" class="option-wrapper" v-bind="dragOptions">
                <div v-for="(item, index) in current.field.options" :key="index" class="option-item">
                  <span class="label-span">{{ item.label }}</span>
                  <span class="value-span">{{ item.value }}</span>
                  <span class="handle-span el-icon-close" @click="handleDeleteOption(item)" />
                </div>
              </draggable>
            </div>
          </div>
        </el-form-item>
        <template v-if="current.field.dataOrigin === '1'">
          <el-form-item label="接口地址">
            <el-input v-model="current.field.api" class="w-100" placeholder="api接口地址" @change="onApiChange" />
          </el-form-item>
          <el-form-item label="接口参数">
            <el-input v-model="current.field.params" class="w-100" type="textarea" placeholder="JSON格式参数" @change="onApiChange" />
          </el-form-item>
        </template>
      </template>
    </div>
  </el-form>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import draggable from 'vuedraggable'
  export default {
    components: {
      draggable
    },
    data() {
      return {
        isEditOption: false,
        optionLabel: '',
        optionValue: '',
        carouselForm: {
          url: '',
          link: '',
          describe: ''
        },
        options: [],
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
      ...mapGetters(['designForm', 'currentFormItem']),
      dragOptions() {
        return {
          animation: 200
        }
      },
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
      ...mapMutations({
        addFormItemOption: 'ADD_FORM_ITEM_OPTION',
        deleteFormItemOption: 'DELETE_FORM_ITEM_OPTION',
        setFormItemOption: 'SET_FORM_ITEM_OPTION'
      }),
      clearCarouselForm() {
        this.carouselForm.url = ''
        this.carouselForm.link = ''
        this.carouselForm.describe = ''
      },
      handleShowEditOption() {
        this.isEditOption = true
        this.clearCarouselForm()
      },
      handleAddOption() {
        const item = {
          label: this.optionLabel,
          value: this.optionValue
        }
        this.addFormItemOption(item, this.currentFormItem)
        this.isEditOption = false
        this.optionLabel = ''
        this.optionValue = ''
      },
      handleSubmitAddCarouselItem() {
        const form = this.carouselForm
        const item = {
          label: form.describe,
          value: form.url,
          link: form.link
        }
        this.addFormItemOption(item, this.currentFormItem)
        this.isEditOption = false
        this.optionLabel = ''
        this.optionValue = ''
      },
      handleHideEditOption() {
        this.isEditOption = false
      },
      handleDeleteOption(data) {
        this.deleteFormItemOption(data)
      },
      async onApiChange() {
        const isApi = this.current.field.api.includes('.do')
        const params = JSON.parse(this.current.field.params)
        if (isApi && params) {
          const res = await request({ url: this.current.field.api, data: params })
          if (res.data && res.data.length > 0) {
            const data = res.data.map(item => {
              return {
                label: item.name,
                value: item.id
              }
            })
            this.setFormItemOption({ id: this.current.field.elementId, data })
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .data-options-warp {
    .title-top {
      padding: 15px;
      background-color: $lightBackground;
      font-size: 14px;
      color: $info;
      border-bottom: 1px solid $border;
    }
    .data-content-area {
      padding: 15px;
      .list-box {
        margin-top: 10px;
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid #dedede;
        .header-col {
          height: 32px;
          background-color: $lightBackground;
          font-size: 12px;
          justify-content: space-between;
          display: flex;
          align-items: center;
          padding: 0 20px;
          color: $mainFontColor;
        }
        .option-wrapper {
          .option-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            font-size: 12px;
            border-bottom: 1px solid #dedede;
            color: $info;
            cursor: move;
            background-color: white;
            &:last-of-type {
              border: 0;
            }
            &:first-of-type {
              border-top: 1px solid #dedede;
            }
            .handle-span {
              @include hover-color($info, $danger);
            }
          }
        }
      }
      .view-box {
        .item {
          height: 32px;
          border: 1px solid $border;
          border-radius: 2px;
          margin-top: 10px;
          display: flex;
          padding: 0 15px;
          justify-content: space-between;
          align-items: center;
          .url {
            color: $info;
            font-size: 12px;
          }
          .handle {
            i {
              font-size: 12px;
              cursor: pointer;
              @include hover-color($info, $skyBlue);
            }
          }
        }
      }
    }
  }
</style>
