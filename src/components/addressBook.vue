<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <div class="address-book-item">
      <el-input v-model="value" :class="data.field.props.className" :placeholder="data.field.props.placeholder" :clearable="data.field.props.clearable" :readonly="data.field.props.readonly" />
      <i class="el-icon-notebook-1" @click="handleClick" />
      <address-book-dialog ref="address-book" :select-fun="onSelectAddress" />
    </div>
  </div>
  <el-form-item v-else :label="data.field.name" :prop="data.field.paramsKey" :style="styles" class="address-book-item">
    <el-input v-model="value" :clearable="data.field.props.clearable" :placeholder="data.field.props.placeholder" :readonly="data.field.props.readonly" />
    <i class="el-icon-notebook-1" @click="handleClick" />
    <address-book-dialog ref="address-book" :select-fun="onSelectAddress" />
  </el-form-item>
</template>

<script>
import addressBookDialog from '@/public/yl-addressBook/Index.vue'
import { parseStyles } from '../utils/style'
import { transformFun } from '../utils/event'
export default {
  components: {
    addressBookDialog
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
        }
      }
    },
    context: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  },
  methods: {
    handleClick() {
      this.$refs['address-book'].init()
    },
    setValue(value) {
      // doing something
    },
    onSelectAddress(row) {
      this.value = `${row.name} ${row.phone} ${row.prov} ${row.city} ${row.area} ${row.address}`
      this.$emit('input', this.value)
      this.$refs['address-book'].hide()
      this.$nextTick(() => {
        this.$refs['address-book'].hide()
        transformFun(this.data.select, 'onSelect', row, this.context, (result) => {
          result && this.$emit('input', result)
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .address-book-item {
    position: relative;
    .el-icon-notebook-1 {
      position: absolute;
      font-size: 16px;
      top: 7px;
      right: 10px;
      @include hover-color($info, $deepBlue);
    }
    .el-input__inner {
      padding-right: 40px;
    }
  }
  .native-field-warp {
    display: flex;
    align-items: center;
  }
</style>
