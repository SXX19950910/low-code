<template>
  <el-form class="grid-options-warp" :model="form" label-position="top">
    <div class="title-top">
      当前选中：{{ current.type }}
    </div>
    <el-collapse>
      <el-collapse-item title="基础">
        <el-form-item label="栅格间隔">
          <el-input-number v-model="current.field.props.gutter" class="w-100" />
        </el-form-item>
        <el-form-item label="元素Class">
          <el-input v-model="current.elementId" disabled />
        </el-form-item>
        <el-form-item label="水平对齐方式">
          <el-select v-model="current.field.props.justify" class="w-100">
            <el-option v-for="item in justifyOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="垂直对齐方式">
          <el-select v-model="current.field.props.align" class="w-100">
            <el-option v-for="item in alignOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="列设置">
          <div class="column-area">
            <draggable v-model="current.field.children" :animation="200" ground=".component" handle=".move-bar">
              <div v-for="(item, index) in current.field.children" :key="index" class="col-item">
                <el-input-number v-model="item.span" :max="24" />
                <el-button class="remove-btn" type="primary" plain icon="el-icon-delete" circle @click="handleDeleteCol(item)" />
                <el-button class="move-btn" plain icon="el-icon-rank" circle />
              </div>
            </draggable>
          </div>
          <div class="add-btn w-100" @click="handleAddFormItem">
            <i class="el-icon-plus success-color" />添加列
          </div>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
export default {
  components: {
  },
  props: {
    field: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      form: {
        justify: '',
        align: ''
      },
      justifyOptions: [
        {
          label: '左对齐',
          value: 'start'
        },
        {
          label: '右对齐',
          value: 'end'
        },
        {
          label: '居中',
          value: 'center'
        },
        {
          label: '间隔对齐',
          value: 'space-around'
        },
        {
          label: '两端对齐',
          value: 'space-between'
        }
      ],
      alignOptions: [
        {
          label: '上对齐',
          value: 'top'
        },
        {
          label: '居中',
          value: 'middle'
        },
        {
          label: '下对齐',
          value: 'bottom'
        }
      ],
      gridList: [
        {
          span: 12
        },
        {
          span: 12
        },
        {
          span: 12
        },
        {
          span: 12
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    handleAddFormItem() {
    },
    init() {
    },
    handleDeleteCol(grid) {
    }
  }
}
</script>

<style lang="scss">
.grid-options-warp {
  .add-btn {
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $lightBackground;
    color: $generalFontColor;
    border: 1px solid $border;
    border-radius: 2px;
    cursor: pointer;
    i {
      margin-right: 5px;
    }
    &:hover {
      background-color: $light-blue;
      border-color: $light-blue;
      color: $skyBlue;
    }
  }
  .move-btn {
    cursor: move;
  }
  .column-area {
    .col-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .remove-btn {
        margin-left: 15px;
      }
    }
  }
}
</style>
