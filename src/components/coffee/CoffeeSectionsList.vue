<template>
  <div class="coffee-section-outer-wrap">
    <div class="coffee-section-wrap" ref="scrollContainer" @mousedown="startDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @mousemove="onDrag">
      <coffee-section-item
          v-show="sections"
          v-for="coffeeSectionItem in sections"
          :key="coffeeSectionItem.id"
          :coffeeSectionItem="coffeeSectionItem"
          :sectionId="sectionId">
      </coffee-section-item>
    </div>
  </div>
</template>

<script>
import CoffeeSectionItem from './CoffeeSectionItem.vue';

export default {
  props: ['sections', 'sectionId'],
  components: {
    CoffeeSectionItem
  },
  data() {
    return {
      isDragging: false,
      startX: 0,
      scrollLeft: 0
    };
  },
  methods: {
    startDrag(e) {
      this.isDragging = true;
      this.startX = e.pageX - this.$refs.scrollContainer.offsetLeft;
      this.scrollLeft = this.$refs.scrollContainer.scrollLeft;
    },
    stopDrag() {
      this.isDragging = false;
    },
    onDrag(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - this.$refs.scrollContainer.offsetLeft;
      const walk = (x - this.startX) * 2; // Умножьте на 2 для ускорения прокрутки
      const newScrollLeft = this.scrollLeft - walk;

      // Ограничение прокрутки
      const maxScrollLeft = this.$refs.scrollContainer.scrollWidth - this.$refs.scrollContainer.clientWidth;
      if (newScrollLeft < 0) {
        this.$refs.scrollContainer.scrollLeft = 0;
      } else if (newScrollLeft > maxScrollLeft) {
        this.$refs.scrollContainer.scrollLeft = maxScrollLeft;
      } else {
        this.$refs.scrollContainer.scrollLeft = newScrollLeft;
      }
    }
  }
};
</script>
