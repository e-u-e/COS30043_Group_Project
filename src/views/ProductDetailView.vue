<template>
  <div class="container mt-4">

    <div v-if="product">

      <div class="row">

        <div class="col-md-6">
          <img
            :src="product.image"
            class="img-fluid"
            :alt="product.name"
          >
        </div>

        <div class="col-md-6">

          <h2>{{ product.name }}</h2>

          <p>{{ product.description }}</p>

          <h4>${{ product.price }}</h4>

          <button class="btn btn-success">
            Add to Cart
          </button>

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