<!-- i worked on the favourites section as part of section 2 because you could argue that cookies and caches are saved locally,
  hence you can have a ssaved favourites list even when logged in -->
<template>
  <div class="container mt-5">
    <h1 class="mb-4">Favourites</h1>

    <div v-if="store.state.favorites.length === 0" class="alert alert-light text-center py-5 border">
      <p class="text-muted mb-0">You haven't saved any items to your favorites layout yet.</p>
    </div>

    <div v-else class="row">
      <div 
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" 
        v-for="product in store.state.favorites" 
        :key="product.id"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/index.js'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'FavouritesView',
  components: {
    ProductCard
  },
  data() {
    return {
      store
    }
  }
}
</script>