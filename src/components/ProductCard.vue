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
        <button class="btn btn-outline-secondary rounded-pill btn-add" @click="handleAddToCart">Add to cart</button>
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

const handleAddToCart = () => {
  store.addToCart(props.product)
}
</script>