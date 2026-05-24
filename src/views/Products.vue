<template>
  <div class="container mt-4">

    <h1 class="mb-4">Products</h1>

    <!-- Search -->
    <input
      v-model="search"
      type="text"
      class="form-control mb-3"
      placeholder="Search products"
    >

    <!-- Sort -->
    <select v-model="sortOrder" class="form-select mb-4">
      <option value="">Sort By</option>
      <option value="low">Price Low to High</option>
      <option value="high">Price High to Low</option>
    </select>

    <div class="row">

      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="product in filteredProducts"
        :key="product.id"
      >

        <div class="card h-100">

          <img
            :src="product.image"
            class="card-img-top"
          >

          <div class="card-body d-flex flex-column">

            <h5>{{ product.name }}</h5>

            <p>{{ product.category }}</p>

            <p>${{ product.price }}</p>

            <router-link
              :to="`/products/${product.id}`"
              class="btn btn-primary mt-auto"
            >
              View Details
            </router-link>

          </div>

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
      products,
      search: '',
      sortOrder: ''
    }
  },

  computed: {
    filteredProducts() {

      let filtered = this.products.filter(product =>
        product.name.toLowerCase().includes(
          this.search.toLowerCase()
        )
      )

      if (this.sortOrder === 'low') {
        filtered.sort((a, b) => a.price - b.price)
      }

      if (this.sortOrder === 'high') {
        filtered.sort((a, b) => b.price - a.price)
      }

      return filtered
    }
  }
}
</script>