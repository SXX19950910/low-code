<template>
  <div>
    <set-component
      v-for="item in columnList"
      :key="item.elementId"
      :ref="item.field.paramsKey || item.elementId"
      :context="context"
      :data="item"
    />
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    formKey: {
      type: String,
      default: ''
    },
    optionsData: {
      type: Object,
      default() {
        return {}
      }
    },
    generateData: {
      type: Object,
      default() {
        return {}
      }
    },
    context: {
      type: Object,
      default() {
        return this.$parent
      }
    }
  },
  data() {
    return {
      columnList: [],
      pageCss: ''
    }
  },
  computed: {
    isStatic() {
      return this.generateData.length > 0 || !this.formKey
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      if (this.isStatic) this.setForm()
      else this.getFormatData()
      this.setCssStyleCode()
    },
    setForm() {
      const { items, css } = this.generateData
      this.columnList = items
      this.pageCss = css
    },
    async getFormatData() {
      const params = {
        parameter: {
          key: this.formKey
        }
      }
      const res = await this.$Api.form.getForms(params)
      if (res.success) {
        const data = JSON.parse(res.data[0].formValue)
        this.apis = data.apis
        this.form = data.model
        this.rules = data.rules
        this.options = data.options
        this.columnList = data.items
        this.data = data.data
        this.handleLoaded()
      }
    },
    setCssStyleCode() {
      let styleTag = document.getElementById('yl-form-style')
      styleTag && styleTag.remove()
      styleTag = document.createElement('style')
      styleTag.setAttribute('type', 'text/css')
      styleTag.setAttribute('id', 'yl-form-style')
      document.head.appendChild(styleTag)
      styleTag.innerText = this.pageCss
    }
  }
}
</script>

<style lang="scss">
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
</style>
