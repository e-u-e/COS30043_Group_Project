<template>
  <span class="star-rating d-inline-flex gap-1" :class="'star-' + size">
    <span
      v-for="i in 5"
      :key="i"
      :class="['star-icon-item', starClass(i), { 'star-clickable': !readonly }]"
      @mouseenter="!readonly && (hovered = i)"
      @mouseleave="!readonly && (hovered = 0)"
      @click="setRating(i)"
    >★</span>
  </span>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    modelValue: { type: Number, default: 0 },
    rating:     { type: Number, default: 0 },
    readonly:   { type: Boolean, default: false },
    size:       { type: String, default: 'md' }
  },
  emits: ['update:modelValue'],
  data() {
    return { hovered: 0 }
  },
  computed: {
    current() {
      return this.readonly ? this.rating : this.modelValue
    }
  },
  methods: {
    setRating(val) {
      if (!this.readonly) this.$emit('update:modelValue', val)
    },
    starClass(i) {
      const active = this.hovered ? i <= this.hovered : i <= this.current
      return active ? 'star-filled' : 'star-empty'
    }
  }
}
</script>

<style scoped>
.star-rating { font-size: 1.4rem; line-height: 1; }
.star-rating.star-sm { font-size: 1rem; }
.star-filled { color: #f5a623; }
.star-empty  { color: #ccc; }
.star-clickable { cursor: pointer; transition: transform 0.1s; }
.star-clickable:hover { transform: scale(1.2); }
</style>
