<template>
  <el-form class="config-table-options-warp" label-position="top">
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
              <div class="name">导出</div>
              <el-checkbox v-model="current.field.props.plain" />
            </div>
            <div class="item">
              <div class="name">列配置</div>
              <el-checkbox v-model="current.field.props.moreVisible" />
            </div>
            <div class="item">
              <div class="name">斑马纹</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
            <div class="item">
              <div class="name">选择框</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
            <div class="item">
              <div class="name">序列号</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
            <div class="item">
              <div class="name">列表边框</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
            <div class="item">
              <div class="name">表头</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
            <div class="item">
              <div class="name">高亮选中</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
            <div class="item">
              <div class="name">分页器</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
            <div class="item">
              <div class="name">最低高度设置</div>
              <el-checkbox v-model="current.field.visible" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="高级">
        <el-form-item label="配置数据">
          <el-select v-model="current.field.props.tableKey" class="w-100" filterable clearable>
            <el-option v-for="item in configOptions" :key="item.value" :label="item.tabKey" :value="item.tabKey" />
          </el-select>
        </el-form-item>
        <el-form-item label="空白文本">
          <el-input v-model="current.field.props.className" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import request from '@/ylCommon/utils/request'
export default {
  components: {
  },
  data() {
    return {
      isEditOption: false,
      optionLabel: '',
      optionValue: '',
      options: [],
      configOptions: [],
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
  created() {
    this.init()
  },
  methods: {
    ...mapMutations({
      addFormItemOption: 'ADD_FORM_ITEM_OPTION',
      deleteFormItemOption: 'DELETE_FORM_ITEM_OPTION',
      getFormItemRule: 'SET_FORM_ITEM_RULE',
      setFormItemOption: 'SET_FORM_ITEM_OPTION'
    }),
    init() {
      this.getTableList()
    },
    async getTableList() {
      const res = await request({ url: '/setting/getTableLists.do', data: { parameter: {}}})
      if (res.success) {
        this.configOptions = res.data.filter(item => !item.tabKey.includes('导入'))
      }
    }
  }
}
</script>

<style lang="scss">
  .choose-options-warp {
  }
</style>
