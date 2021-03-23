<template>
  <component :is="`${data.field.type}Item`" :data="data" :element-id="data.elementId" :context="context" />
</template>

<script>
export default {
  components: {
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
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
    }
  },
  created() {}
}
</script>

<style lang="scss">
</style>
