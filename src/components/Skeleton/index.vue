<script>
import skeletonRow from './row.vue'
export default {
  components: {
    skeletonRow
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    rows: {
      type: [Number, String],
      default: 3
    },
    active: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '32px'
    }
  },
  data() {
    return {
      rowCount: []
    }
  },
  computed: {
    countRows() {
      let res = 3
      const windowHeight = window.innerHeight
      if (typeof this.rows === 'string') {
        const startIndex = this.rows.lastIndexOf(' ')
        const lastIndex = this.rows.lastIndexOf('p')
        const differHeight = this.rows.substring(startIndex + 1, lastIndex)
        const height = windowHeight - parseInt(differHeight)
        res = parseFloat((height / 32).toFixed(0))
      } else res = this.rows
      return res
    }
  },
  mounted() {
  },
  render() {
    const that = this
    const $row = (rowLength) => {
      const res = []
      for (let key = 0; key < rowLength; key++) {
        res.push(<skeleton-row active={this.active} height={this.height} />)
      }
      return res
    }
    const $children = this.loading ? $row(that.countRows) : this.$slots.default
    return (
      <div className='skeleton-wrap'>
        { $children }
      </div>
    )
  }
}
</script>

<style lang="scss">
  .skeleton-wrap {
  }
</style>
