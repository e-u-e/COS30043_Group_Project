<template>
  <div>

    <!-- Hero Section -->
    <section class="bg-dark text-white text-center py-5">

      <div class="container">

        <h1 class="display-4 fw-bold">
          Welcome to NovaStore
        </h1>

        <p class="lead mt-3">
          Discover the latest electronics, fashion, and accessories
        </p>

        <router-link
          to="/products"
          class="btn btn-primary btn-lg mt-3"
        >
          Shop Now
        </router-link>

      </div>

    </section>

    <!-- Featured Products -->
    <section class="container my-5">

      <h2 class="mb-4 text-center">
        Featured Products
      </h2>

      <div class="row">

        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          v-for="product in featuredProducts"
          :key="product.id"
        >

          <div class="card h-100 shadow-sm">

            <img
              :src="product.image"
              class="card-img-top"
              alt="product image"
            >

            <div class="card-body d-flex flex-column">

              <h5 class="card-title">
                {{ product.name }}
              </h5>

              <p class="card-text">
                ${{ product.price }}
              </p>

              <router-link
                :to="`/products/${product.id}`"
                class="btn btn-outline-primary mt-auto"
              >
                View Product
              </router-link>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- Categories -->
    <section class="bg-light py-5">

      <div class="container">

        <h2 class="text-center mb-4">
          Shop By Category
        </h2>

        <div class="row text-center">

          <div class="col-6 col-md-3 mb-4">
            <div class="card p-4 h-100">
              <h4>Electronics</h4>
            </div>
          </div>

          <div class="col-6 col-md-3 mb-4">
            <div class="card p-4 h-100">
              <h4>Fashion</h4>
            </div>
          </div>

          <div class="col-6 col-md-3 mb-4">
            <div class="card p-4 h-100">
              <h4>Shoes</h4>
            </div>
          </div>

          <div class="col-6 col-md-3 mb-4">
            <div class="card p-4 h-100">
              <h4>Accessories</h4>
            </div>
          </div>

        </div>

      </div>

    </section>

  </div>
</template>

<script>
import products from '../data/products.json'

export default {

  data() {
    return {
      featuredProducts: products.slice(0, 4)
    }
  }

}
</script>