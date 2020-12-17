<template>
  <div class="yl-choose-warp">
    <template v-if="moreVisible">
      <div v-for="item in headOptions" :key="item.value" class="choose-item" :class="multiple ? current.includes(item.value) ? `current ${getClass}` : getClass : current === item.value ? `current ${getClass}` : `${getClass}`" @click="handleClick(item.value)">
        <span class="span-name">{{ item.label }}</span>
      </div>
      <template v-if="overVisible">
        <div v-for="item in overOptions" :key="item.value" class="choose-item" :class="multiple ? current.includes(item.value) ? `current ${getClass}` : getClass : current === item.value ? `current ${getClass}` : `${getClass}`" @click="handleClick(item.value)">
          <span class="span-name">{{ item.label }}</span>
        </div>
      </template>
      <div v-if="moreBtnVisible" @click="handleToggleAllVisible">
        <span class="link-span">{{ toggleBtnText }} <i class="ml-5" :class="toggleBtnIcon" /></span>
      </div>
    </template>
    <template v-else>
      <div v-for="item in options" :key="item.value" class="choose-item" :class="multiple ? current.includes(item.value) ? `current ${getClass}` : getClass : current === item.value ? `current ${getClass}` : `${getClass}`" @click="handleClick(item.value)">
        <span class="span-name">{{ item.label }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'loadsh'
export default {
  props: {
    moreVisible: {
      type: Boolean,
      default: false
    },
    moreSliceNumber: {
      type: Number,
      default: 0
    },
    plain: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: false
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
      current: [],
      overVisible: false
    }
  },
  computed: {
    getClass() {
      return this.plain ? 'is-plain' : ''
    },
    moreBtnVisible() {
      return this.moreVisible && (this.options.length > this.moreSliceNumber)
    },
    toggleBtnIcon() {
      return this.overVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    toggleBtnText() {
      return this.overVisible ? '收缩' : '展开'
    },
    headOptions() {
      const options = _.cloneDeep(this.options)
      return options.slice(0, this.moreSliceNumber)
    },
    overOptions() {
      const options = _.cloneDeep(this.options)
      return options.slice(this.moreSliceNumber)
    }
  },
  mounted() {
  },
  methods: {
    handleClick(value) {
      const isMultiple = this.multiple
      const current = this.current
      if (isMultiple) {
        if (current.includes(value)) {
          current.map((item, index) => {
            if (item === value) this.current.splice(index, 1)
          })
        } else this.current.push(value)
      } else {
        this.current = value
      }
      const result = isMultiple ? _.cloneDeep(this.current) : value
      this.$emit('change', result)
    },
    handleToggleAllVisible() {
      this.overVisible = !this.overVisible
    },
    setValue(value) {
      this.current = value
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
  .yl-choose-warp {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .choose-item {
      padding: 5px;
      border: 1px solid transparent;
      margin-right: 20px;
      line-height: normal;
      border-radius: 2px;
      cursor: pointer;
      color: $generalFontColor;
      transition: .26s ease all;
      .span-name {
        font-size: 12px;
        font-weight: 500;
      }
      &.current {
        background-color: $skyBlue;
        border-color: $skyBlue;
        color: #fff;
      }
      &:hover {
        border-color: $skyBlue;
      }
    }
    .choose-item.is-plain {
      &.current {
        border: 1px solid $skyBlue;
        background-color: transparent;
        color: $skyBlue;
      }
    }
  }
</style>
