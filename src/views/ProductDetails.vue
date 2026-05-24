<template>
  <div class="container mt-4">

    <div v-if="product">

      <div class="row">

        <div class="col-md-6">
          <img
            :src="product.image"
            class="img-fluid"
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

  </div>
</template>

<script>
import products from '../data/products.json'

export default {
  data() {
    return {
      product: null
    }
  },

  created() {

    const id = parseInt(this.$route.params.id)

    this.product = products.find(
      product => product.id === id
    )
  }
}
</script>