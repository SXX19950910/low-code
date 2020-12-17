<template>
  <swiper v-if="visible" ref="slide" class="slide-display-warp" :options="slideOptions">
    <swiper-slide
      v-for="item in data.field.children"
      :key="item.elementId"
    >
      <drag-component :key="item.elementId" :field="item" :element-id="item.elementId" />
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination" />
    <div slot="button-prev" class="swiper-button-prev" @click.stop="handlePrev" />
    <div slot="button-next" class="swiper-button-next" @click.stop="handleNext" />
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import { parseStyles } from '@/utils/style'
import { mapGetters, mapMutations } from 'vuex'
import { formatFormItem, removeAllNonItem } from '@/utils/global'
import _ from 'loadsh'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: true,
      options: {
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        }
      }
    }
  },
  computed: {
    ...mapGetters(['collection']),
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    },
    slideOptions() {
      const { slidesPerView, spaceBetween } = this.data.field.props
      return {
        slidesPerView,
        spaceBetween,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        }
      }
    }
  },
  watch: {
    slideOptions() {
      this.update()
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapMutations({
      addFormItemToChildren: 'ADD_FORM_ITEM_TO_CHILDREN'
    }),
    handlePrev() {
      this.$refs.slide.$swiper.slidePrev()
      console.log(this.$refs.slide)
    },
    handleNext() {
      this.$refs.slide.$swiper.slideNext()
    },
    update() {
      this.visible = false
      this.$nextTick(() => {
        this.visible = true
      })
    },
    onAdd(data) {
      removeAllNonItem()
      const isSort = data.item.className.includes('form-drag-warp')
      if (isSort) return
      const fieldId = data.item.getAttribute('field-id')
      const parentId = data.to.getAttribute('data-parent')
      const elementId = data.to.getAttribute('data-id')
      const field = formatFormItem(_.cloneDeep(this.collection.find(item => item.id === fieldId)))
      field.parentId = parentId
      field.parentType = 'slideDisplay'
      const obj = {
        parentId,
        elementId,
        field,
        index: data.newIndex
      }
      this.addFormItemToChildren(obj)
    }
  }
}
</script>

<style lang="scss">
  .slide-display-warp {
    width: 1000px;
    min-height: 200px;
    .swiper-slide {
      .container {
        border: 1px solid $border;
        min-height: 200px;
      }
    }
  }
</style>
