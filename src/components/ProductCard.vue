<template>
  <div class="card h-100 position-relative">

    <button 
      type="button"
      class="favorite-btn-overlay" 
      @click.stop.prevent="handleFavoriteClick"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
      <img 
        :src="isFavorite || isHovered ? '/public/star-svgrepo-filled.svg' : '/public/star-svgrepo-com.svg'" 
        class="star-icon"
        :class="{ 'rotate-star': isHovered || isFavorite }"
        alt="favorite star status"
      />
    </button>

    <div class="card-img-wrap">
      <img :src="product.image" class="card-img-top card-image" alt="product image">
    </div>

    <div class="card-body card-content">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-price">${{ product.price }}</p>

      <div class="d-flex gap-2">
        <router-link :to="`/products/${product.id}`" class="btn btn-primary rounded-pill btn-view">
          View
        </router-link>
        <button class="btn btn-outline-secondary rounded-pill btn-add" @click="$emit('add-to-cart', product)">Add to cart</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { store } from '../store/index.js'

const props = defineProps({
  product: Object
})

const isHovered = ref(false)

const isFavorite = computed(() => {
  return store.isProductFavorite(props.product.id)
})

const handleFavoriteClick = () => {
  store.toggleFavorite(props.product)
}
</script>

<style scoped>
.card {
  transition: box-shadow 0.25s ease, transform 0.18s ease;
}

.card:hover {
  box-shadow:
    rgba(0, 0, 0, 0.18) 0 18px 28px -8px,
    rgba(0, 0, 0, 0.12) 0 8px 14px -10px;
  transform: translateY(-7px);
}

.favorite-btn-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
}

.star-icon {
  width: 28px;
  height: 28px;
  display: block;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.35));
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.rotate-star {
  transform: rotate(72deg) scale(1.15);
}

.card-img-wrap {
  overflow: hidden;
}

.card-image {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.card:hover .card-image {
  transform: scale(1.03);
}

.btn-view, .btn-add {
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.btn-view:hover, .btn-add:hover {
  transform: translateY(-4px);
}
</style>