<template>
  <component :is="`${data.field.type}Item`" :data="data" :element-id="data.elementId" :context="context" />
</template>

<script>
import dateItem from './date'
import inputItem from './input'
import chooseItem from './choose'
import textareaItem from './textarea'
import selectItem from './select'
import groupItem from './group'
import radioGroupItem from './radioGroup'
import checkboxItem from './checkbox'
import timeItem from './time'
import gridItem from './grid'
import dateAreaItem from './dateArea'
import buttonItem from './button'
import addressBookItem from './addressBook'
import configTableItem from './configTable'
import buttonDrawerItem from './buttonDrawer'
import richTextItem from './richText'
import containerItem from './container'
import carouselItem from './carousel'
import scmNavItem from './scmNav'
import slideDisplayItem from './slideDisplay'
export default {
  components: {
    scmNavItem,
    carouselItem,
    containerItem,
    buttonDrawerItem,
    richTextItem,
    dateAreaItem,
    buttonItem,
    addressBookItem,
    configTableItem,
    textareaItem,
    timeItem,
    gridItem,
    radioGroupItem,
    groupItem,
    selectItem,
    checkboxItem,
    chooseItem,
    inputItem,
    dateItem,
    slideDisplayItem
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
