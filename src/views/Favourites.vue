<!-- i worked on the favourites section as part of section 2 because you could argue that cookies and caches are saved locally,
  hence you can have a ssaved favourites list even when logged in -->
<template>
  <div class="container mt-4">
    <h1 class="mb-4">Favourites</h1>

    <div v-if="store.state.favorites.length === 0" class="text-center py-5">
      <div class="mb-3">
        <img src="/star-svgrepo-com.svg" alt="Favourites" style="width: 64px; height: 64px;">
      </div>
      <h4 class="text-muted mb-3">You haven't favourited any items.</h4>
      <router-link to="/products" class="btn btn-primary rounded-pill px-5">
        Browse Products
      </router-link>
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