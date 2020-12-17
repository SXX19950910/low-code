<script>
export default {
  props: {
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
    return {}
  },
  render() {
    const className = this.active ? 'skeleton-row active' : 'skeleton-row'
    return (
      <div class={className} style={{ height: this.height }} />
    )
  }
}
</script>

<style lang="scss">
  .skeleton-row {
    background: #f2f2f2;
    &.active {
      background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
      animation: skeleton-loading .3s ease infinite;
      background-size: 400% 100%;
    }
    @keyframes skeleton-loading {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }
  }
</style>
