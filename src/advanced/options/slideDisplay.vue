<template>
  <el-form class="slide-display-options-warp" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="显示名称">
          <el-input v-model="current.field.name" />
        </el-form-item>
        <el-form-item label="字段Prop">
          <el-input v-model="current.field.paramsKey" />
        </el-form-item>
        <el-form-item label="元素Class">
          <el-input v-model="current.elementId" disabled />
        </el-form-item>
        <el-form-item label="字段Class">
          <el-input v-model="current.field.props.className" />
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
              <el-checkbox v-model="current.field.visible" />
            </div>
            <div class="item">
              <div class="name">自动轮播</div>
              <el-checkbox v-model="current.field.props.autoplay" />
            </div>
            <div class="item">
              <div class="name">前进后退按钮</div>
              <el-checkbox v-model="current.field.props.navigation" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="高级">
        <el-form-item label="每页显示个数">
          <el-input-number v-model="current.field.props.slidesPerView" class="w-100" />
        </el-form-item>
        <el-form-item label="滑块间隔">
          <el-input-number v-model="current.field.props.spaceBetween" class="w-100" />
        </el-form-item>
        <el-form-item label="滑动项">
          <draggable v-model="current.field.children" class="slide-list">
            <el-tag v-for="item in current.field.children" :key="item.elementId" class="w-100 mb-10" size="medium" closable disable-transitions @close="onRemoveTag(item)">
              <span class="fs-14">普通容器</span> <span class="fs-12 info-color ml-5">{{ item.elementId }}</span>
            </el-tag>
          </draggable>
          <el-button class="w-100" type="primary" size="mini" @click="handleAddItem">添加容器</el-button>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <rich-text-dialog ref="rich" />
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { formatFormItem, generateId } from '../../utils/global'
import richTextDialog from '../../tools/richTextDialog'
import draggable from 'vuedraggable'
import _ from 'loadsh'
export default {
  components: {
    draggable,
    richTextDialog
  },
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
    ...mapGetters(['designForm', 'currentFormItem', 'collection']),
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
      addFormItemToChildren: 'ADD_FORM_ITEM_TO_CHILDREN',
      removeFormItemToChildren: 'DELETE_FORM_ITEM_TO_CHILDREN'
    }),
    handleAddItem() {
      const { elementId } = this.current
      const field = formatFormItem(_.cloneDeep(this.collection.find(item => item.label === '普通容器')))
      field.elementId = generateId()
      field.parentId = elementId
      this.addFormItemToChildren(field)
    },
    onRemoveTag(item) {
      this.removeFormItemToChildren(item)
    }
  }
}
</script>

<style lang="scss">
  .slide-display-options-warp {
    .slide-list {
      .el-tag {
        cursor: move;
      }
    }
  }
</style>
