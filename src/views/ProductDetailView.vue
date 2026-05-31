<template>
  <div class="container mt-4 product-detail-view">

    <div v-if="product">

      <div class="row align-items-center g-4">

        <div class="col-md-6 d-flex justify-content-center">
          <img
            :src="product.image"
            class="img-fluid"
            :alt="product.name"
            style="max-height: 420px; object-fit: contain;"
          >
        </div>

        <div class="col-md-6 d-flex flex-column justify-content-center">

          <h2>{{ product.name }}</h2>

          <p>{{ product.description }}</p>

          <h4>${{ product.price }}</h4>

          <div class="d-flex flex-wrap justify-content-center gap-2 mt-2">
            <button class="btn btn-success rounded-pill px-4">
              Add to Cart
            </button>

            <router-link to="/products" class="btn btn-outline-secondary rounded-pill px-4">
              Back to Products
            </router-link>
          </div>

        </div>

      </div>

    </div>

    <div v-else class="alert alert-warning">
      Product not found.
    </div>

  </div>
</template>

<script>
import { getProductById } from '../services/api'

export default {
  data() {
    return {
      product: null
    }
  },

  async created() {
    this.product = await getProductById(this.$route.params.id)
  }
}
</script>